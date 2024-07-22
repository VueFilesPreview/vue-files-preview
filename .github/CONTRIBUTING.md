[中文](./CONTRIBUTING_CN.md) · **English**

# Contributor

If you would like to contribute to our project, please carefully read the following development conventions. Only when we have a consensus can our project get better and better!

## Contributing Code

### 1. Branch Management

Do not develop on the `master` branch. The `master` branch is only for merging pull requests and releasing versions. For daily development, please use the `dev` branch. For feature development, please create a feature branch named `feat-xxx`. Similarly, for bug fixes, please create a fix branch named `fix-xxx`.

### 2. Commit Process

After completing development and committing on the `dev` branch or a `feat-xxx` branch, please use `git rebase origin/master` for local merging. After resolving all code conflicts locally, submit a pull request to members with permission for timely merging.

## 3. About Feature Branches and Dev Branch

By default, after submitting a pull request (PR), feature branches and fix branches will be deleted upon merging into the `master` branch.

The `dev` branch, however, will not be deleted. During development on this branch, please synchronize the main branch by performing `git rebase master` beforehand. This is because the `master` branch accepts merges from feature branches and fix branches, potentially causing the `master` branch to be ahead of the `dev` branch.

## 4. Rebase Synchronization Procedure

When synchronizing with the main repository using `rebase` to resolve conflicts, after resolving conflicts, you may notice indicators such as `pull [number]` and `push [number]` when using `git status`. These indicate the number of commits behind and ahead of the remote branch, respectively. This is a normal situation resulting from `rebase`. At this point, you need to execute `git push -f` to perform a forced push to the remote branch, ensuring synchronization with the `master` branch and avoiding unnecessary commits.

## References

Reference Link: [Branch Management](https://www.ruanyifeng.com/blog/2012/07/git.html)
