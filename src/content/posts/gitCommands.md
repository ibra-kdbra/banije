---
title: Git Commands with Examples
published: 2024-02-18
description: 'Learn about essential Git commands with examples to streamline your workflow.'
image: ''
tags: [Git, Commands, Examples, Guide]
category: 'Version Control'
draft: false
---

## 1. Git Merge

Git merge allows you to combine work from two branches into one.

```sh
git merge <branch>
```

:::tip
Use `git merge` to integrate changes from one branch into another, typically the main branch.
:::

---

## 2. Git Diff

Git diff shows the differences between any two commits or files within your Git repository.

```sh
git diff <source branch> <target branch>
```

---

## 3. Git Log

The `git log` command lists all commits in your project history.

```sh
git log
```

:::note
Use options like `--oneline` or `--graph` to simplify or visualize the log.
:::

---

## 4. Git Show

Git show displays the details of a specific Git object (e.g., commit, tag, or tree).

```sh
git show <commit>
```

---

## 5. Git Grep

Git grep searches your codebase for occurrences of a specific string or pattern.

```sh
git grep -n <pattern>
```

---

## 6. Git Branch

Create or list branches in your repository.

```sh
git branch
```

:::tip
Use `git branch -d <branch>` to delete a branch.
:::

---

## 7. Git Push

Push your local commits to a remote repository.

```sh
git push -u <remote> <branch>
```

---

## 8. Git Stash

Save changes temporarily without committing them.

```sh
git stash
```

:::important
Remember to run `git stash pop` to reapply your stashed changes.
:::

---

## 9. Git Rebase

Update a branch by applying commits on top of a base branch.

```sh
git rebase <base>
```

:::caution
Ensure you’re aware of the difference between `rebase` and `merge` to avoid unwanted history rewrites.
:::

---

## 10. Git Config

Set or get global or repository-specific options.

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

---

## 11. Git Clone

Clone an existing repository to your local machine.

```sh
git clone <repository>
```

---

## 12. Git Init

Create a new Git repository.

```sh
git init
```

---

## 13. Git Checkout

Switch between branches or restore files.

```sh
git checkout <branch>
```

---

## 14. Git Reset

Reset your current HEAD to a specific commit.

```sh
git reset <commit>
```

---

## 15. Git Tag

Manage tags in your repository.

```sh
git tag
```

:::tip
Use `git tag -a <tag>` to create an annotated tag.
:::

---

## 16. Git Archive

Create an archive of files from a specific commit or branch.

```sh
git archive
```

---

## 17. Git Commit

Record changes to the repository.

```sh
git commit -m "Commit message"
```

---

## 18. Git Status

Display the working tree status.

```sh
git status
```

---

## 19. Git RM

Remove files from the working tree and index.

```sh
git rm <file>
```

---

## 20. Git Remote

Manage a set of tracked repositories.

```sh
git remote add <name> <url>
```

---

## 21. Git Instaweb

Launch a local web-based Git repository viewer.

```sh
git instaweb
```

---

## 22. Git Notes

Add extra information to commits.

```sh
git notes add <message>
```

---

## 23. Git Bisect

Debug your repository by locating a problematic commit.

```sh
git bisect
```

---

## 24. Git Submodules

Import other repositories as submodules.

```sh
git submodule add <repository>
```

---

## 25. Git Bugreport

Compile a bug report with system and repository information.

```sh
git bugreport
```

---

## 26. Git Fsck

Verify the integrity of your repository and recover unreachable objects.

```sh
git fsck
```

---

## 27. Git Stripspace

Remove trailing whitespace from your repository.

```sh
git stripspace
```

---

## 28. Git Hooks

Run scripts automatically in response to Git lifecycle events.

```sh
git hooks
```

---

## 29. Git Blame

Show who last modified a line in a file.

```sh
git blame <file>
```

---

## 30. Git LFS (Large File Storage)

Manage large files in your Git repository.

```sh
git lfs
```

---

## 31. Git Garbage Collection

Optimize your repository by cleaning up unnecessary files.

```sh
git gc
```

---

## 32. Git Describe

Generate a readable name for a commit based on the most recent tag.

```sh
git describe
```

---

## 33. Git Reflog

View all Git actions performed on the repository.

```sh
git reflog
```

---

## 34. Git Log (Enhanced)

Visualize commit logs with additional options.

```sh
git log --graph --oneline
```

---

## 35. Git Cherry Pick

Apply a commit from another branch to your current branch.

```sh
git cherry-pick <commit>
```

---

## 36. Git Switch

Quickly switch between branches.

```sh
git switch <branch>
```

:::note
`git switch` is a modern alternative to `git checkout` for branch switching.
:::

---
