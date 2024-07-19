local api, fn = vim.api, vim.fn

local FIND_ARG = '-w'
local localfile_arg = true -- Always use -l if possible. #6683

---@type table[]
local buf_hls = {}

local M = {}

local function man_error(msg)
  M.errormsg = 'man.lua: ' .. vim.inspect(msg)
  error(M.errormsg)
end

-- Run a system command and timeout after 30 seconds.
---@param cmd_ string[]
---@param silent boolean?
---@param env string[]
---@return string
local function system(cmd_, silent, env)
  local stdout_data = {} ---@type string[]
  local stderr_data = {} ---@type string[]
  local stdout = assert(vim.loop.new_pipe(false))
  local stderr = assert(vim.loop.new_pipe(false))

  local done = false
  local exit_code ---@type integer?

  -- We use the `env` command here rather than the env option to vim.loop.spawn since spawn will
  -- completely overwrite the environment when we just want to modify the existing one.
  --
  -- Overwriting mainly causes problems NixOS which relies heavily on a non-standard environment.
  local cmd = cmd_
  if env then
    cmd = { 'env' }
    vim.list_extend(cmd, env)
    vim.list_extend(cmd, cmd_)
  end

  local handle
  handle = vim.loop.spawn(cmd[1], {
    args = vim.list_slice(cmd, 2),
    stdio = { nil, stdout, stderr },
  }, function(code)
    exit_code = code
    stdout:close()
    stderr:close()
    handle:close()
    done = true
  end)

  if handle then
    stdout:read_start(function(_, data)
      stdout_data[#stdout_data + 1] = data
    end)
    stderr:read_start(function(_, data)
      stderr_data[#stderr_data + 1] = data
    end)
  else
    stdout:close()
    stderr:close()
    if not silent then
      local cmd_str = table.concat(cmd, ' ')
      man_error(string.format('command error: %s', cmd_str))
    end
    return ''
  end

  vim.wait(30000, function()
    return done
  end)

  if not done then
    if handle then
      handle:close()
      stdout:close()
      stderr:close()
    end
    local cmd_str = table.concat(cmd, ' ')
    man_error(string.format('command timed out: %s', cmd_str))
  end

  if exit_code ~= 0 and not silent then
    local cmd_str = table.concat(cmd, ' ')
    man_error(string.format("command error '%s': %s", cmd_str, table.concat(stderr_data)))
  end

  return table.concat(stdout_data)
end

---@param line string
---@param linenr integer
local function highlight_line(line, linenr)
  ---@type string[]
  local chars = {}
  local prev_char = ''
  local overstrike, escape = false, false

  ---@type table<integer,{attr:integer,start:integer,final:integer}>
  local hls = {} -- Store highlight groups as { attr, start, final }

  local NONE, BOLD, UNDERLINE, ITALIC = 0, 1, 2, 3
  local hl_groups = { [BOLD] = 'manBold', [UNDERLINE] = 'manUnderline', [ITALIC] = 'manItalic' }
  local attr = NONE
  local byte = 0 -- byte offset

  local function end_attr_hl(attr_)
    for i, hl in ipairs(hls) do
      if hl.attr == attr_ and hl.final == -1 then
        hl.final = byte
        hls[i] = hl
      end
    end
  end

  local function add_attr_hl(code)
    local continue_hl = true
    if code == 0 then
      attr = NONE
      continue_hl = false
    elseif code == 1 then
      attr = BOLD
    elseif code == 22 then
      attr = BOLD
      continue_hl = false
    elseif code == 3 then
      attr = ITALIC
    elseif code == 23 then
      attr = ITALIC
      continue_hl = false
    elseif code == 4 then
      attr = UNDERLINE
    elseif code == 24 then
      attr = UNDERLINE
      continue_hl = false
    else
      attr = NONE
      return
    end

    if continue_hl then
      hls[#hls + 1] = { attr = attr, start = byte, final = -1 }
    else
      if attr == NONE then
        for a, _ in pairs(hl_groups) do
          end_attr_hl(a)
        end
      else
        end_attr_hl(attr)
      end
    end
  end

  -- Break input into UTF8 code points. ASCII code points (from 0x00 to 0x7f)
  -- can be represented in one byte. Any code point above that is represented by
  -- a leading byte (0xc0 and above) and continuation bytes (0x80 to 0xbf, or
  -- decimal 128 to 191).
  for char in line:gmatch('[^\128-\191][\128-\191]*') do
    if overstrike then
      local last_hl = hls[#hls]
      if char == prev_char then
        if char == '_' and attr == ITALIC and last_hl and last_hl.final == byte then
          -- This underscore is in the middle of an italic word
          attr = ITALIC
        else
          attr = BOLD
        end
      elseif prev_char == '_' then
        -- Even though underline is strictly what this should be. <bs>_ was used by nroff to
        -- indicate italics which wasn't possible on old typewriters so underline was used. Modern
        -- terminals now support italics so lets use that now.
        -- See:
        -- - https://unix.stackexchange.com/questions/274658/purpose-of-ascii-text-with-overstriking-file-format/274795#274795
        -- - https://cmd.inp.nsk.su/old/cmd2/manuals/unix/UNIX_Unleashed/ch08.htm
        -- attr = UNDERLINE
        attr = ITALIC
      elseif prev_char == '+' and char == 'o' then
        -- bullet (overstrike text '+^Ho')
        attr = BOLD
        char = '·'
      elseif prev_char == '·' and char == 'o' then
        -- bullet (additional handling for '+^H+^Ho^Ho')
        attr = BOLD
        char = '·'
      else
        -- use plain char
        attr = NONE
      end

      -- Grow the previous highlight group if possible
      if last_hl and last_hl.attr == attr and last_hl.final == byte then
        last_hl.final = byte + #char
      else
        hls[#hls + 1] = { attr = attr, start = byte, final = byte + #char }
      end

      overstrike = false
      prev_char = ''
      byte = byte + #char
      chars[#chars + 1] = char
    elseif escape then
      -- Use prev_char to store the escape sequence
      prev_char = prev_char .. char
      -- We only want to match against SGR sequences, which consist of ESC
      -- followed by '[', then a series of parameter and intermediate bytes in
      -- the range 0x20 - 0x3f, then 'm'. (See ECMA-48, sections 5.4 & 8.3.117)
      ---@type string?
      local sgr = prev_char:match('^%[([\032-\063]*)m$')
      -- Ignore escape sequences with : characters, as specified by ITU's T.416
      -- Open Document Architecture and interchange format.
      if sgr and not string.find(sgr, ':') then
        local match ---@type string?
        while sgr and #sgr > 0 do
          -- Match against SGR parameters, which may be separated by ';'
          match, sgr = sgr:match('^(%d*);?(.*)')
          add_attr_hl(match + 0) -- coerce to number
        end
        escape = false
      elseif not prev_char:match('^%[[\032-\063]*$') then
        -- Stop looking if this isn't a partial CSI sequence
        escape = false
      end
    elseif char == '\027' then
      escape = true
      prev_char = ''
    elseif char == '\b' then
      overstrike = true
      prev_char = chars[#chars]
      byte = byte - #prev_char
      chars[#chars] = nil
    else
      byte = byte + #char
      chars[#chars + 1] = char
    end
  end

  for _, hl in ipairs(hls) do
    if hl.attr ~= NONE then
      buf_hls[#buf_hls + 1] = {
        0,
        -1,
        hl_groups[hl.attr],
        linenr - 1,
        hl.start,
        hl.final,
      }
    end
  end

  return table.concat(chars, '')
end

local function highlight_man_page()
  local mod = vim.bo.modifiable
  vim.bo.modifiable = true

  local lines = api.nvim_buf_get_lines(0, 0, -1, false)
  for i, line in ipairs(lines) do
    lines[i] = highlight_line(line, i)
  end
  api.nvim_buf_set_lines(0, 0, -1, false, lines)

  for _, args in ipairs(buf_hls) do
    api.nvim_buf_add_highlight(unpack(args))
  end
  buf_hls = {}

  vim.bo.modifiable = mod
end

-- replace spaces in a man page name with underscores
-- intended for PostgreSQL, which has man pages like 'CREATE_TABLE(7)';
-- while editing SQL source code, it's nice to visually select 'CREATE TABLE'
-- and hit 'K', which requires this transformation
---@param str string
---@return string
local function spaces_to_underscores(str)
  local res = str:gsub('%s', '_')
  return res
end

---@param sect string|nil
---@param name string|nil
---@param silent boolean
local function get_path(sect, name, silent)
  name = name or ''
  sect = sect or ''
  -- Some man implementations (OpenBSD) return all available paths from the
  -- search command. Previously, this function would simply select the first one.
  --
  -- However, some searches will report matches that are incorrect:
  -- man -w strlen may return string.3 followed by strlen.3, and therefore
  -- selecting the first would get us the wrong page. Thus, we must find the
  -- first matching one.
  --
  -- There's yet another special case here. Consider the following:
  -- If you run man -w strlen and string.3 comes up first, this is a problem. We
  -- should search for a matching named one in the results list.
  -- However, if you search for man -w clock_gettime, you will *only* get
  -- clock_getres.2, which is the right page. Searching the resuls for
  -- clock_gettime will no longer work. In this case, we should just use the
  -- first one that was found in the correct section.
  --
  -- Finally, we can avoid relying on -S or -s here since they are very
  -- inconsistently supported. Instead, call -w with a section and a name.
  local cmd ---@type string[]
  if sect == '' then
    cmd = { 'man', FIND_ARG, name }
  else
    cmd = { 'man', FIND_ARG, sect, name }
  end

  local lines = system(cmd, silent)
  local results = vim.split(lines or {}, '\n', { trimempty = true })

  if #results == 0 then
    return
  end

  -- `man -w /some/path` will return `/some/path` for any existent file, which
  -- stops us from actually determining if a path has a corresponding man file.
  -- Since `:Man /some/path/to/man/file` isn't supported anyway, we should just
  -- error out here if we detect this is the case.
  if sect == '' and #results == 1 and results[1] == name then
    return
  end

  -- find any that match the specified name
  ---@param v string
  local namematches = vim.tbl_filter(function(v)
    local tail = fn.fnamemodify(v, ':t')
    return string.find(tail, name, 1, true)
  end, results) or {}
  local sectmatches = {}

  if #namematches > 0 and sect ~= '' then
    ---@param v string
    sectmatches = vim.tbl_filter(function(v)
      return fn.fnamemodify(v, ':e') == sect
    end, namematches)
  end

  return fn.substitute(sectmatches[1] or namematches[1] or results[1], [[\n\+$]], '', '')
end

---@param text string
---@param pat_or_re string
local function matchstr(text, pat_or_re)
  local re = type(pat_or_re) == 'string' and vim.regex(pat_or_re) or pat_or_re

  ---@type integer, integer
  local s, e = re:match_str(text)

  if s == nil then
    return
  end

  return text:sub(vim.str_utfindex(text, s) + 1, vim.str_utfindex(text, e))
end

-- attempt to extract the name and sect out of 'name(sect)'
-- otherwise just return the largest string of valid characters in ref
---@param ref string
---@return string, string
local function extract_sect_and_name_ref(ref)
  ref = ref or ''
  if ref:sub(1, 1) == '-' then -- try ':Man -pandoc' with this disabled.
    man_error("manpage name cannot start with '-'")
  end
  local ref1 = ref:match('[^()]+%([^()]+%)')
  if not ref1 then
    local name = ref:match('[^()]+')
    if not name then
      man_error('manpage reference cannot contain only parentheses: ' .. ref)
    end
    return '', name
  end
  local parts = vim.split(ref1, '(', { plain = true })
  -- see ':Man 3X curses' on why tolower.
  -- TODO(nhooyr) Not sure if this is portable across OSs
  -- but I have not seen a single uppercase section.
  local sect = vim.split(parts[2] or '', ')', { plain = true })[1]:lower()
  local name = parts[1]
  return sect, name
end

-- find_path attempts to find the path to a manpage
-- based on the passed section and name.
--
-- 1. If manpage could not be found with the given sect and name,
--    then try all the sections in b:man_default_sects.
-- 2. If it still could not be found, then we try again without a section.
-- 3. If still not found but $MANSECT is set, then we try again with $MANSECT
--    unset.
-- 4. If a path still wasn't found, return nil.
---@param sect string?
---@param name string
function M.find_path(sect, name)
  if sect and sect ~= '' then
    local ret = get_path(sect, name, true)
    if ret then
      return ret
    end
  end

  if vim.b.man_default_sects ~= nil then
    local sects = vim.split(vim.b.man_default_sects, ',', { plain = true, trimempty = true })
    for _, sec in ipairs(sects) do
      local ret = get_path(sec, name, true)
      if ret then
        return ret
      end
    end
  end

  -- if none of the above worked, we will try with no section
  local res_empty_sect = get_path('', name, true)
  if res_empty_sect then
    return res_empty_sect
  end

  -- if that still didn't work, we will check for $MANSECT and try again with it
  -- unset
  if vim.env.MANSECT then
    local mansect = vim.env.MANSECT
    vim.env.MANSECT = nil
    local res = get_path('', name, true)
    vim.env.MANSECT = mansect
    if res then
      return res
    end
  end

  -- finally, if that didn't work, there is no hope
  return nil
end
