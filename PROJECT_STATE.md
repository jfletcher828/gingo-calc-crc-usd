# Gringo Calc Project State

## Current Version
v1.0

## Current Branch
feature/decimal-wording

## Latest Stable Tag
v1.0

## Repository Status
Feature branch synchronized with remote.
v1.0 tag created and points to latest commit.

Commit:
e85ed9b - Add focus-aware number to words display

---

## Project Overview

Gringo Calc is a single-page web application for converting between:

- Costa Rican Colones (CRC)
- US Dollars (USD)
- Exchange Rate (CRC per USD)

Current architecture uses:

- HTML
- CSS
- Vanilla JavaScript
- localStorage persistence
- Debounced calculations
- Focus-aware UI behavior

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
- Automatic update on:
  - focus
  - input
  - calculation
  - clear
- Capitalized output text

Examples:

100 USD
→ One hundred dollars

443 Exchange Rate
→ Four hundred forty-three colones per dollar

1.500.000 CRC
→ One million five hundred thousand colones

---

## Current Number-To-Words Architecture

### Constants

ONES[]
TENS[]

### Functions

numberToWords(num)

Converts:

- 0
- 1-19
- 20-99
- 100-999
- thousands
- millions

updateNumberWordsDisplay()

Uses:

focusedField

to determine which value should be displayed.

Current display is whole-number only.

Example:

50.23 USD
→ Fifty dollars

(decimal portion intentionally ignored)

---

## Current Known Limitation

Decimals are truncated using:

Math.floor()

Examples:

50.23 USD
→ Fifty dollars

1500000.75 CRC
→ One million five hundred thousand colones

---

## Active Development

### Branch

feature/decimal-wording

### Goal

Add decimal wording support to the number-to-words display.

Examples:

50.23 USD
→ Fifty dollars and twenty-three cents

1.01 USD
→ One dollar and one cent

1500000.75 CRC
→ One million five hundred thousand colones and seventy-five centimos

1.25 Exchange Rate
→ One colon per dollar and twenty-five centavos

---

## Planned Architecture

### Enhancements

numberToWords()

- support hyphenated tens
- twenty-three
- seventy-five

splitNumberParts(value)

Returns:

{
  whole,
  decimal
}

buildCurrencyPhrase(
  value,
  singular,
  plural,
  decimalLabel
)

Handles:

- dollars
- cents
- colones
- centimos
- exchange rate wording

---

## Future Backlog

### High Priority

- Decimal wording support
- Singular/plural grammar improvements

### Medium Priority

- English/Spanish localization
- Additional CRC formatting refinements

### Low Priority

- Calculation history
- Share/export functionality