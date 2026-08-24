# Gringo Calc Project State

## Current Version

v1.0

## Latest Stable Tag

v1.0

## Current Branch

feature/decimal-wording

## Development Environment

### Primary IDE

Visual Studio Code (VS Code)

All future development should assume VS Code is the primary development environment.

Repository Root:

C:\Users\e041591\source\repos\gingo-calc-crc-usd

### Repository Structure

```text
gingo-calc-crc-usd
├── app.js
├── index.html
├── styles.css
├── PROJECT_STATE.md
└── .git
```

### Recommended VS Code Extensions

- GitLens
- GitHub Pull Requests and Issues
- Live Server
- Prettier

### Local Testing

Open index.html using Live Server.

Right-click:

```text
index.html
```

Select:

```text
Open with Live Server
```

### Git Workflow

Start Development Session

```bash
git checkout feature/decimal-wording
git pull
git status
```

Review Changes

```bash
git diff
git status
```

Commit Changes

```bash
git add .
git commit -m "Meaningful commit message"
```

Push Changes

```bash
git push origin feature/decimal-wording
```

### Release Workflow

Create Tag

```bash
git tag -a vX.Y -m "Release description"
```

Push Tag

```bash
git push origin vX.Y
```

### Project Documentation

PROJECT_STATE.md is the authoritative project handoff document.

Update PROJECT_STATE.md whenever:

- A feature branch is created
- A major feature is completed
- A release is tagged
- Significant architecture changes are introduced

Future Copilot chats should use PROJECT_STATE.md as the primary source of project continuity.

---

## Project Overview

Gringo Calc is a single-page web application used to convert between:

- Costa Rican Colones (CRC)
- United States Dollars (USD)
- Exchange Rate (CRC per USD)

Technologies:

- HTML
- CSS
- Vanilla JavaScript
- localStorage
- Git
- GitHub
- VS Code

---

## Completed Features

### v0.9

- Three-way calculator functionality
- CRC ↔ USD ↔ Exchange Rate calculations
- Debounced input handling
- Authoritative field logic using lastEditedField
- localStorage persistence
- Costa Rican CRC formatting support
- Exchange Rate persistence
- Improved Clear button behavior
- Stable tagged release (v0.9)

### v1.0

- Focus-aware number-to-words display
- English wording support
- USD wording
- CRC wording
- Exchange Rate wording
- Support for thousands and millions
- Capitalized display output
- Automatic updates during:
  - focus
  - input
  - calculation
  - clear operations

Examples:

```text
100 USD
→ One hundred dollars

443 Exchange Rate
→ Four hundred forty-three colones per dollar

1.500.000 CRC
→ One million five hundred thousand colones
```

---

## Current Number-To-Words Architecture

### Constants

```javascript
ONES[]
TENS[]
```

### Functions

```javascript
numberToWords(num)
```

Supports:

- Single digits
- Teens
- Tens
- Hundreds
- Thousands
- Millions

```javascript
updateNumberWordsDisplay()
```

Uses:

```javascript
focusedField
```

to determine which value should be displayed.

---

## Current Limitation

Decimal values are ignored because:

```javascript
Math.floor()
```

is used before conversion.

Examples:

```text
50.23 USD
→ Fifty dollars
```

```text
1,500,000.75 CRC
→ One million five hundred thousand colones
```

---

## Active Development

### Branch

feature/decimal-wording

### Goal

Add decimal wording support.

Desired behavior:

```text
50.23 USD
→ Fifty dollars and twenty-three cents
```

```text
1.01 USD
→ One dollar and one cent
```

```text
1,500,000.75 CRC
→ One million five hundred thousand colones and seventy-five centimos
```

```text
1.25 Exchange Rate
→ One colon per dollar and twenty-five centavos
```

---

## Planned Architecture

### numberToWords()

Enhance wording:

```text
twenty-three
seventy-five
```

using hyphenated tens.

### splitNumberParts(value)

Returns:

```javascript
{
  whole,
  decimal
}
```

### buildCurrencyPhrase()

```javascript
buildCurrencyPhrase(
  value,
  singular,
  plural,
  decimalLabel
)
```

Responsible for formatting:

- dollars
- cents
- colones
- centimos
- exchange-rate wording

---

## Future Backlog

### High Priority

- Decimal wording support
- Improved singular/plural grammar

### Medium Priority

- English/Spanish localization
- Additional CRC formatting refinements

### Low Priority

- Calculation history
- Share/export functionality

---

## Git Milestones

```text
v0.9
├─ Three-way calculator
├─ Debounce model
├─ CRC formatting
└─ localStorage persistence

v1.0
└─ Focus-aware number-to-words display

feature/decimal-wording
└─ In Progress
```