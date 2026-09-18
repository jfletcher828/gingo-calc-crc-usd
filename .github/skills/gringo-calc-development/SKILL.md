---
name: gringo-calc-development
description: Develop or modify Gringo Calc features while preserving its calculator, formatting, persistence, debounce, and focus-aware behavior. Use for feature implementation, bug fixes, refactoring, and changes to app.js, index.html, or styles.css.
---

# Gringo Calc Development

1. Read `PROJECT_STATE.md`.
2. Inspect the current Git branch and working-tree status.
3. Review `app.js`, `index.html`, and `styles.css`.
4. Identify the existing data flow affected by the request.
5. State the expected behavior and regression risks.
6. Propose no more than three small implementation steps.
7. Change only the files required for the current step.
8. Preserve established calculation and formatting behavior.
9. Run or describe the relevant checks from `references/test-cases.md`.
10. Summarize changed files and remaining tests.

Do not replace working calculator logic with a new architecture unless the
user explicitly requests a refactor.

Do not advance to another implementation phase until the current behavior has
been tested.