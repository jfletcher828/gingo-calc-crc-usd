---
name: gringo-calc-release
description: Prepare a Gringo Calc feature branch for commit, push, merge, and annotated release tagging. Use after implementation and regression testing are complete.
---

# Gringo Calc Release

1. Inspect:
   - `git status`
   - current branch
   - upstream tracking
   - recent log
   - working-tree diff
2. Confirm the working tree contains only intended changes.
3. Confirm regression testing is complete.
4. Update `PROJECT_STATE.md` with:
   - completed feature
   - current version
   - current branch
   - latest stable tag
   - known limitations
   - next planned work
5. Recommend a concise commit message.
6. Commit and push the feature branch.
7. Create an annotated tag only after the release commit is final.
8. Verify the branch, remote branch, and tag point to the intended commit.
9. Produce concise release notes.

Never recommend `git push --force` when `--force-with-lease` is sufficient.

Never tag a commit while unresolved conflicts, unstaged changes, or an active
rebase remain.
