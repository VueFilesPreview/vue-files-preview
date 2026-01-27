---
name: smart-commit
description: 智能分组提交代码。按功能/模块划分未提交的代码，分批次有条理地 commit。当用户提到"提交"、"commit"、"分组提交"时使用。
---

# 智能分组提交

按功能或模块划分当前未提交的代码，分批次创建有条理的 commit 记录。

## 核心约束

1. **禁止 AI 共同作者信息** - commit message 中不得包含任何 `Co-Authored-By` 或类似的 AI 生成标识
2. **使用 git config 作者** - 保持当前 git 配置的 user.name 和 user.email 作为提交作者
3. **代码安全优先** - 遇到提交检查失败时，必须确保代码不丢失
4. **原子化提交** - 每个 commit 应该是一个独立的功能单元

## 执行流程

### 第一步：收集信息

```bash
# 查看当前 git 用户配置
git config user.name
git config user.email

# 查看所有未提交的变更（不使用 -uall 避免大仓库内存问题）
git status

# 查看未暂存的变更
git diff --stat

# 查看已暂存的变更
git diff --cached --stat

# 查看最近的 commit 风格
git log --oneline -10
```

### 第二步：分析变更并分组

根据以下维度对变更进行分组：

1. **按目录/模块分组**（本项目结构）
   - `packages/preview/supports/` - 各类文件预览组件
     - `audio-preview/` - 音频预览
     - `code-preview/` - 代码预览
     - `docx-preview/` - Word 文档预览
     - `epub-preview/` - EPUB 电子书预览
     - `md-preview/` - Markdown 预览
     - `pdf-preview/` - PDF 预览
     - `pic-preview/` - 图片预览
     - `txt-preview/` - 文本预览
     - `video-preview/` - 视频预览
     - `xlsx-preview/` - Excel 预览
     - `unknown-preview/` - 未知类型预览
     - `vue-files-preview/` - 主预览组件
   - `packages/preview/` - 预览核心（常量、接口、工具）
   - `packages/` - 包入口和版本
   - `example/` - 示例项目
   - `.github/` - GitHub Actions 和工作流
   - `.claude/` - Claude 配置
   - `vite-plugins/` - Vite 插件
   - `scripts/` - 构建脚本
   - 根目录配置文件（package.json, vite.config.ts 等）

2. **按功能类型分组**
   - `feat:` - 新功能
   - `fix:` - bug 修复
   - `build:` - 构建相关、依赖更新
   - `refactor:` - 代码重构
   - `style:` - 样式/格式调整
   - `docs:` - 文档更新
   - `chore:` - 工具/配置变更
   - `test:` - 测试相关
   - `perf:` - 性能优化

3. **按业务功能分组**
   - 识别相关联的文件（如预览组件 + 常量配置 + 工具函数）
   - 同一预览类型的变更归为一组（如 pdf-preview 相关文件）
   - 多个预览组件的通用改动可合并提交

### 第三步：与用户确认分组方案

向用户展示分组方案并确认：

```
建议将变更分为以下 N 个 commit:

1. feat: 添加 XXX 功能
   - file1.tsx
   - file2.ts

2. fix: 修复 YYY 问题
   - file3.ts

请确认或调整分组方案。
```

### 第四步：逐个提交

对每个分组执行：

```bash
# 1. 先重置暂存区（如果需要）
git reset HEAD

# 2. 添加该分组的文件
git add <file1> <file2> ...

# 3. 提交（不带 Co-Authored-By）
git commit -m "<type>: <description>"
```

## Commit Message 规范

### 格式（本项目风格）

```
<type>: <简短描述（英文为主，中文亦可）>
```

**注意**: 本项目 commit 描述以英文为主，简洁明了。中文描述也可接受。

### Type 类型

| Type     | 说明                         |
| -------- | ---------------------------- |
| feat     | 新功能                       |
| fix      | Bug 修复                     |
| build    | 构建相关、依赖更新           |
| refactor | 代码重构（不改变功能）       |
| style    | 格式调整（空格、分号）       |
| docs     | 文档变更                     |
| test     | 测试相关                     |
| chore    | 工具/配置变更                |
| perf     | 性能优化                     |

### 示例（参考本项目历史）

```
feat: add class name with type preview
feat: pdf use url to preview
fix: change version
fix: PdfPreview can't use url error
fix: 修复长文本无法滚动问题
build: bump sass from 1.81.0 to 1.85.0
chore: update dependencies
```

## 错误处理：提交前检查失败

当代码检查失败时：

### 1. 保存当前状态

```bash
# 查看当前暂存的文件
git diff --cached --name-only

# 创建临时 stash 备份（包含暂存和未暂存）
git stash push -m "backup-before-fix-$(date +%Y%m%d-%H%M%S)"
```

### 2. 分析失败原因

常见失败原因：
- ESLint 错误
- TypeScript 类型错误

```bash
# 运行 lint 检查
pnpm lint

# 运行构建检查
pnpm build
```

### 3. 修复问题

```bash
# 自动修复 lint 问题
pnpm lint:fix
```

### 4. 恢复并重新提交

```bash
# 恢复 stash
git stash pop

# 重新添加文件
git add <files>

# 重新提交
git commit -m "<message>"
```

### 5. 如果修复失败

```bash
# 确保 stash 中有备份
git stash list

# 可以随时恢复
git stash apply stash@{0}
```

## 安全措施

1. **提交前备份**
   - 每次提交前确认变更内容
   - 复杂操作前创建 stash 备份

2. **分步执行**
   - 不要一次性添加所有文件
   - 每个 commit 后验证状态

3. **回滚方案**

   ```bash
   # 撤销最后一次 commit（保留变更）
   git reset --soft HEAD~1

   # 撤销 add（保留变更）
   git reset HEAD <file>
   ```

## 禁止事项

- **禁止** 在 commit message 中添加 `Co-Authored-By: Claude` 或任何 AI 相关信息
- **禁止** 修改 git config 的 user 信息
- **禁止** 使用 `--amend` 修改已推送的 commit
- **禁止** 使用 `--force` 强制推送
- **禁止** 跳过 hooks（`--no-verify`）除非用户明确要求
- **禁止** 在没有备份的情况下执行可能丢失代码的操作

## 输出格式

每次提交后输出：

```
✓ Commit 1/N: <commit message>
  - <file1>
  - <file2>
  SHA: <short-sha>

✓ Commit 2/N: <commit message>
  ...

提交完成！共创建 N 个 commit。
```
