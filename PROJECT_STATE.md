# Gringo Calc Project State

## Current Version

v1.1

## Latest Stable Tag

v1.1

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
├── assets
│   └── icons
├── app.js
├── index.html
├── manifest.json
├── service-worker.js
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

### v1.1

- Decimal wording support for USD, CRC, and Exchange Rate values
- Correct singular and plural wording for fractional currency labels
- Hyphenated compound number wording
- Dynamic inverse-rate label beside the Exchange Rate label
- Exchange Rate persistence from localStorage
- Clear button removes the saved exchange-rate value

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

## Progressive Web App Support

Gringo Calc now includes a static PWA shell so it can be installed from a
supported mobile browser when served from `localhost` or an HTTPS host.

PWA files:

- `manifest.json`
- `service-worker.js`
- `assets/icons/icon-192.png`
- `assets/icons/icon-512.png`
- `assets/icons/apple-touch-icon.png`

The service worker caches the app shell only:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- icon assets

Calculator state remains stored in browser `localStorage`; no persistence
migration was introduced.

---

## Active Development

### Branch

feature/decimal-wording

### Goal

Check in PWA install/offline support for Cloudflare deployment.

Completed PWA behavior:

```text
Installable from supported mobile browsers when served over HTTPS.
```

```text
Offline reload works after the app shell has been cached once.
```

Calculator behavior and localStorage persistence were not changed by the PWA
implementation.

---

## Future Backlog

### High Priority

- Browser installability test on deployed Cloudflare site
- Offline reload test on deployed Cloudflare site

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