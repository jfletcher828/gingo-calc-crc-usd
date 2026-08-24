Continue development of the Gringo Calc project.

IMPORTANT WORKING RULES

- Review PROJECT_STATE.md before proposing any changes.
- Review the current code in app.js, index.html, and styles.css before making recommendations.
- Do not assume code structure from previous chats. Use the actual files in the workspace.
- Preserve all existing functionality.
- Use a cautious software-engineering approach.
- Provide no more than THREE implementation steps at a time.
- Pause after each set of steps and wait for testing results before continuing.
- When reviewing code, look for regressions and side effects.
- Explain why proposed changes are needed.
- Favor small incremental changes over large refactors.

PROJECT

Gringo Calc is a single-page web application that converts between:

- CRC (Costa Rican Colones)
- USD (United States Dollars)
- Exchange Rate (CRC per USD)

TECHNOLOGY STACK

- HTML
- CSS
- Vanilla JavaScript
- localStorage persistence
- Git
- GitHub
- Visual Studio Code

CURRENT DEVELOPMENT ENVIRONMENT

Repository Root:

C:\Users\e041591\source\repos\gingo-calc-crc-usd

Primary IDE:

Visual Studio Code

CURRENT BRANCH

feature/decimal-wording

LATEST STABLE TAG

v1.0

CURRENT STATUS

The feature branch contains approved work for the next release.

Completed in this work:

- Decimal wording support for USD, CRC, and Exchange Rate number wording.
- Correct singular/plural labels for dollars, cents, colones, centimos, and colones per dollar.
- Hyphenated compound number wording such as twenty-three and seventy-five.
- Dynamic inverse-rate label beside the Exchange Rate label.
- Inverse-rate label displays only the calculated value in parentheses, limited to 8 decimal places.
- Removed the hard-coded default Exchange Rate value of 443.
- Exchange Rate now recalls the last saved value from localStorage on load, matching CRC and USD behavior.
- Clear now blanks Exchange Rate and removes the saved exchange-rate value.
- Project support files and repo guidance were added under .github, docs, and the VS Code workspace file.

VALIDATION COMPLETED

- node --check app.js
- git --no-pager diff --check

Validation notes:

- JavaScript syntax check passed.
- Git diff check passed with only LF/CRLF normalization warnings for app.js and styles.css.
- Manual user review completed; behavior was approved.

FILES CHANGED FOR RELEASE

Expected release commit includes:

- app.js
- index.html
- styles.css
- PROJECT_STATE.md
- docs/COPILOT_PROMPT.md
- .github/
- gingo-calc-crc-usd.code-workspace

RELEASE STATUS

Commit, push, and version tag are pending.

Recommended next release:

- v1.1

Reason:

- This is a minor feature release: it adds decimal wording, inverse-rate display, and exchange-rate persistence behavior changes without changing the core calculator architecture.

NEXT STEPS

1. Review the final diff.
2. Stage the approved release files explicitly.
3. Commit with an imperative message.
4. Push feature/decimal-wording.
5. Create and push annotated tag v1.1 if approved.