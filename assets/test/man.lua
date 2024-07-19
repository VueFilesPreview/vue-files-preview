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
