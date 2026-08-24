---
name: gringo-calc-checkin-release-helper
description: >-
  Guide the user through checking in completed Gringo Calc work and optionally
  creating a versioned release. Use only in the gingo-calc-crc-usd repository
  when the user says a task is complete, approved, satisfactory, ready to commit,
  ready to check in, ready to tag, or ready to release. Update copilot_prompt.md
  with the completed changes before check-in.
---

# Gringo Calc Check-In and Release Helper

Use this skill only for the **Gringo Calc** repository, `gingo-calc-crc-usd`.

This skill makes Copilot a guide and collaborator. Copilot should explain each step, provide the exact command or proposed edit, and let the user choose whether Copilot performs the step or the user performs it.

## Scope check

Before using this workflow, confirm the repository from the working directory or Git root:

```powershell
git rev-parse --show-toplevel
git remote -v
```

Continue only when the repository is `gingo-calc-crc-usd` or the repository content clearly identifies it as Gringo Calc. If it is a different repository, explain that this skill is Gringo Calc-specific and do not apply the workflow.

## Required completion choice

When the user is satisfied with a task but does not specify the desired Git outcome, ask:

**The Gringo Calc task is ready. Which outcome would you like?**

1. **Check in only**: review, validate, update `copilot_prompt.md`, commit, and optionally push the current branch.
2. **Check in and version a release**: review, validate, update `copilot_prompt.md`, commit, optionally push, create an approved version tag, and optionally push the tag.

If the user already clearly selected an outcome, do not ask again.

Interpret `1`, `check in`, `commit`, or `commit only` as **Check in only**.
Interpret `2`, `release`, `version`, or `tag it` as **Check in and version a release**.

## Helper mode

At the beginning of the workflow, and whenever the preferred mode is not already clear, ask:

**How would you like to proceed?**

1. **Guide me**: Copilot gives one or two commands or edits at a time. The user runs or applies them and pastes the result. Copilot reviews the result before continuing.
2. **Copilot-assisted**: Copilot may make the proposed file edits or run the proposed commands when tools are available, but must explain the action first and receive explicit approval before any write, commit, push, or tag operation.

Rules:

- Preserve the selected mode for the rest of the workflow unless the user changes it.
- In **Guide me** mode, do not claim to have run a command or changed a file.
- In **Copilot-assisted** mode, do not silently edit files or execute Git write operations.
- Keep guidance to one or two steps at a time, then inspect the result before continuing.
- Never ask again for information or authorization the user already supplied.

## Safety rules

- Never commit, push, tag, merge, rebase, reset, stash, amend, force-push, delete, or rewrite history without explicit user authorization for that action.
- Never stage credentials, secrets, `.env` files, editor state, machine-specific files, generated output, or unrelated changes.
- Prefer explicit file paths instead of `git add .`.
- Stop when a command or validation fails. Explain the exact failure and the smallest next step.
- Never say a build or test passed unless its command completed successfully.
- Do not commit directly to `main` unless the user explicitly requests it and the repository workflow allows it.
- Do not create, move, replace, delete, or force-push an existing tag.

## Phase 1: Inspect the current work

Guide or, with approval, run these read-only commands:

```powershell
git status --short --branch
git diff --check
git diff --stat
git log -5 --oneline --decorate
git remote -v
git tag --sort=-version:refname | Select-Object -First 10
```

Then summarize:

- current branch;
- modified, added, deleted, and untracked files;
- whether the branch is ahead of or behind its upstream;
- likely unrelated or unsafe files;
- most recent commits and version tags.

Do not proceed until the intended task changes are clearly identified.

## Phase 2: Validate Gringo Calc

First inspect repository guidance and available scripts, including:

- `PROJECT_STATE.md`;
- `copilot_prompt.md`;
- `.github/copilot-instructions.md` if present;
- `README.md`;
- `package.json` if present;
- existing test files or documented browser checks.

Propose the narrowest validation appropriate to the changed files. This can include syntax checks, repository tests, and the documented Gringo Calc browser or DevTools checks. Explain each check and what success looks like.

In **Guide me** mode, provide no more than two commands or manual checks at once and wait for the results.
In **Copilot-assisted** mode, obtain approval before running validation commands that create or modify files.

If validation fails, stop the check-in workflow and help correct the issue first.

## Phase 3: Update copilot_prompt.md

Updating `copilot_prompt.md` is required before either check-in outcome.

Read the existing file and preserve its structure, tone, and useful project context. Update it so the next Copilot session accurately reflects the repository after the completed task.

At minimum, review and update these topics when they exist in the file:

- current project status;
- completed feature or fix;
- behavior and implementation details that changed;
- files changed;
- branch name;
- validation and test results;
- known issues or remaining work;
- recommended next task;
- relevant Git status, commit, and version information when known.

Do not invent results, commit SHAs, tags, or completed work. Before a commit or tag exists, describe it as pending. After creation, update the file again only if the repository convention expects the prompt to contain the resulting SHA or tag.

Workflow:

1. Show a concise proposed change summary for `copilot_prompt.md`.
2. Ask whether the user wants:
   - **Copilot to update the file**, or
   - **the exact Markdown for the user to paste**.
3. Apply or guide the approved edit.
4. Review the resulting diff:

```powershell
git diff -- copilot_prompt.md
```

5. Confirm the prompt describes the current Gringo Calc state and contains no stale instructions.

## Phase 4: Prepare the commit

After validation and the `copilot_prompt.md` update:

1. Review the complete diff.
2. Propose the exact files to stage.
3. Propose an imperative commit subject using the repository's existing convention. If no convention is evident, use a suitable Conventional Commit type such as `feat`, `fix`, `docs`, `test`, `refactor`, or `chore`.
4. Include validation evidence in the proposed summary.
5. Ask whether Copilot should perform the staging and commit or guide the user through it.

Before committing, verify the staged changes:

```powershell
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Commit only the approved files with the approved message.

## Option 1: Check in only

After the commit:

```powershell
git status --short --branch
git log -3 --oneline --decorate
```

Explain the results. If the user asked only to check in, ask separately whether they want to push the current branch. Provide the exact normal push command or, with approval, run it. Never force-push.

Do not create a tag or release.

## Option 2: Check in and version a release

After the commit succeeds:

1. Inspect existing version tags and any versioning guidance in `PROJECT_STATE.md`, `copilot_prompt.md`, `README.md`, or other project files.
2. Recommend one next version and explain whether it is patch, minor, or major.
3. Ask the user to approve or replace the proposed version.
4. Verify the tag does not exist locally or remotely.
5. Make any required version-file or changelog updates using the same helper-mode choice. Validate and commit those edits before tagging.
6. Ensure the intended release commit is correct and, if approved, pushed.
7. Propose an annotated tag command, using the established project prefix such as `v`:

```powershell
git tag -a vX.Y.Z -m "Release vX.Y.Z"
```

8. Ask whether Copilot should run the command or the user should run it.
9. Verify the tag:

```powershell
git show --no-patch --decorate vX.Y.Z
```

10. Ask separately whether to push the approved tag:

```powershell
git push origin vX.Y.Z
```

A Git tag is the default meaning of a versioned release for this skill. Create a hosted GitHub Release only when the user explicitly requests it.

## Completion summary

End with:

```text
Project: Gringo Calc
Mode: <Guide me | Copilot-assisted>
Outcome: <Check in only | Check in and version a release>
Branch: <branch>
copilot_prompt.md: <updated and reviewed | not completed>
Validation: <commands/checks and results>
Commit: <short SHA and subject | not created>
Pushed branch: <remote branch | no>
Version: <tag | not created>
Pushed tag: <yes | no>
Working tree: <clean | remaining changes>
Next step: <one concrete next action, if needed>
```
