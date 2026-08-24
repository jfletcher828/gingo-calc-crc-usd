---
name: gringo-calc-handoff
description: Update the Gringo Calc project-state handoff and create a continuation prompt for a new Copilot conversation. Use when changing branches, completing a feature, tagging a release, or moving development to another chat.
---

# Gringo Calc Handoff

1. Read the current `PROJECT_STATE.md`.
2. Inspect the current branch, status, tags, and recent commits.
3. Review the current source files when code behavior has changed.
4. Update `PROJECT_STATE.md` without removing valid historical context.
5. Record:
   - repository purpose
   - development environment
   - current branch
   - latest stable tag
   - completed functionality
   - current implementation details
   - known limitations
   - active development goal
   - regression checklist
   - Git workflow
6. Create a continuation prompt that instructs Copilot to:
   - read `PROJECT_STATE.md`
   - review actual workspace files
   - preserve current behavior
   - work in no more than three implementation steps
   - identify risks before changing code
7. Show the exact documentation changes for review.
