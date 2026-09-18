# Gringo Calc Copilot Instructions

## Project context

Gringo Calc is a browser-based CRC, USD, and exchange-rate calculator.

Technology stack:

- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage
- Git and GitHub
- Visual Studio Code

Read PROJECT_STATE.md before making project changes.

Review app.js, index.html, and styles.css before proposing changes that
could affect application behavior.

## Development rules

- Preserve the existing three-way calculation behavior.
- Preserve the lastEditedField authoritative calculation model.
- Preserve debounced calculation behavior.
- Preserve localStorage persistence.
- Preserve Costa Rican CRC formatting.
- Preserve focus-aware number wording.
- Do not introduce a framework or build system unless explicitly requested.
- Prefer small, isolated changes over broad refactoring.
- Provide no more than three implementation steps at a time.
- Do not modify unrelated code.
- Explain regression risks before changing calculation or parsing logic.
- Never discard working logic solely to simplify an implementation.

## Number and currency conventions

- CRC display format uses periods for thousands and a comma for decimals.
- Example: 1.500.000,75
- USD uses a decimal point.
- Exchange rate represents colones per US dollar.
- English number wording uses American English without "and" inside whole
  numbers.
- Hyphenate compound values from twenty-one through ninety-nine.
- Use correct singular and plural currency labels.

## Validation

Before declaring a change complete:

- Test CRC as the authoritative field.
- Test USD as the authoritative field.
- Test Exchange Rate as the authoritative field.
- Test focus switching.
- Test blur formatting.
- Test Clear.
- Test persistence after reload.
- Check the browser console for errors.
``