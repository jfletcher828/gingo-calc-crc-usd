Save the following as:

PROJECT_STATE.md

# Gringo Calc - v0.9

## Project Status

Current version:

```text
v0.9


Git tag created:

git tag -a v0.9 -m "Gringo Calc v0.9"
git push origin v0.9


Working branch:

main


Planned feature branch:

git checkout -b feature/number-to-words
git push -u origin feature/number-to-words

Application Overview

Gringo Calc is a CRC/USD currency calculator.

Fields:

CRC
Exchange Rate
USD


Current supported calculations:

CRC + Rate -> USD
USD + Rate -> CRC
CRC + USD -> Rate


All three fields may be derived from the other two.

Completed Features
Calculator Engine

Implemented:

Three-way calculation logic


Behavior:

CRC edited -> USD recalculated
USD edited -> CRC recalculated
Rate edited -> recalculates non-authoritative monetary field


Uses:

lastEditedField


to determine authority.

Debounced Input

Implemented:

input events


plus:

setTimeout()


debouncing.

Current delay:

1500ms


Behavior:

Typing pauses -> calculate
Blur -> calculate immediately

Recursive Protection

Implemented:

isCalculating


guard.

Prevents:

Recursive calculations
Double execution
Event loops

Persistence

Implemented via localStorage.

Persisted:

CRC
USD
Exchange Rate
lastEditedField


Keys:

gringoCalcCRC
gringoCalcUSD
gringoCalcExchangeRate
gringoCalcLastEditedField

Clear Button

Behavior:

CRC = blank
USD = blank
Rate = 443
lastEditedField = crc


Preserved by design.

CRC Formatting

Current implementation:

formatCRC()
parseCRC()


Goal:

Costa Rican formatting


Examples:

1.000.000
1.500.000
1.500.000,50


Important discovery:

CRC field cannot be:

<input type="number">


because:

1.500.000


is not valid for numeric inputs.

CRC field was changed to:

<input type="text" inputmode="decimal">


This fixed the issue where CRC became blank after formatting.

Current Known Good Behavior

Verified via testing.

CRC → USD

Example:

CRC  = 1500000
Rate = 443

USD = 3386.00


Working.

USD → CRC

Example:

USD  = 100
Rate = 443

CRC = 44.300


Working.

Rate Calculation

Example:

CRC = 1500000
USD = 3386


Rate derives correctly.

Working.

Important Lessons Learned
parseCRC Was Not Broken

Debugging confirmed:

parseCRC("1500000")


returns:

1500000


correctly.

Problem was:

<input type="number">


not parseCRC.

Authoritative Logic Works

Current design:

lastEditedField


tracks:

crc
usd


Exchange Rate does not become authoritative.

This behavior should be preserved.

Next Feature
Number To Words

Development branch:

feature/number-to-words

Feature Goal

Display the written form of the field that currently has focus.

Example:

USD = 100


Display:

One hundred dollars


Example:

CRC = 1.500.000


Display:

One million five hundred thousand colones

UX Proposal

Add below calculator:

<div id="numberWords"></div>


Example display:

One hundred dollars


or

Four hundred forty-three colones per dollar


or

One million five hundred thousand colones

Phase 1 Scope

Implement:

English output only
Whole numbers only


Supported:

CRC
USD
Exchange Rate


No cents.

No decimals.

Field Behavior

When focus enters:

CRC


show CRC words.

When focus enters:

USD


show USD words.

When focus enters:

Exchange Rate


show Exchange Rate words.

Technical Design

Planned functions:

updateNumberWords(fieldName)


and

numberToWords(value)


Event hooks:

focus
input
blur

Suggested Next Chat Prompt
Continue the Gringo Calc project from PROJECT_STATE.md v0.9.

We are now working on branch:

feature/number-to-words

Goal:
Display the written form of the value in the currently focused field beneath the calculator.

Examples:

100 USD
→ One hundred dollars

443 Exchange Rate
→ Four hundred forty-three colones per dollar

1.500.000 CRC
→ One million five hundred thousand colones

Scope:
- English only
- Whole numbers only
- Focus-aware display
- Preserve existing calculator functionality
- Review current app.js, index.html, and styles.css before proposing changes

Provide no more than three implementation steps at a time.

Release Summary
Version 0.9 Highlights
Three-way calculator functionality
CRC ↔ USD ↔ Exchange Rate calculations
Debounced input handling
Authoritative field logic using lastEditedField
localStorage persistence
Costa Rican CRC formatting support
Exchange Rate persistence
Improved Clear button behavior
Stable tagged release (v0.9)
Known Future Enhancements
Number-to-words display
Decimal/cents wording support
English/Spanish localization
Additional CRC formatting refinements
Calculation history
Share/export functionality

This file should be a complete handoff point for starting the **feature/number-to-words** branch in a fresh chat.
