# Gringo Calc: Project State and Technical Handoff

## 1. Purpose

Gringo Calc is a lightweight, publicly accessible single-page web application for converting between Costa Rican colones (CRC) and U.S. dollars (USD). The application is intended to calculate the missing value when two of these three values are available:

- CRC amount
- Exchange rate in CRC per 1 USD
- USD amount

The initial example exchange rate is:

```text
1 USD = 443 CRC
```

The application is independent of RSM resources and is hosted through the owner's personal Cloudflare and GitHub accounts.

---

## 2. Repository and Hosting

### GitHub

- Repository name: `gringo-calc-crc-usd`
- Local folder name: `gringo-calc-crc-usd`
- GitHub repository visibility was configured as public.
- Because local Git authentication caused push problems, files were uploaded and committed through the GitHub web interface.

### Cloudflare

- The GitHub repository is connected to Cloudflare.
- Deployment is using Cloudflare's current Workers and Pages experience.
- The deployment command shown by Cloudflare was:

```text
npx wrangler deploy
```

- The first deployment failed because the GitHub repository contained only `README.md` and did not yet contain the static application files.
- After `index.html`, `styles.css`, and `app.js` were uploaded to GitHub, deployment succeeded.
- The production application can be opened from the Cloudflare project under the **Domains** tab by selecting **Visit**.
- The exact production URL is not recorded in this document. Add it below when convenient.

```text
Production URL: <add Cloudflare URL here>
```

### Deployment workflow

```text
Edit files
    -> Commit changes in GitHub
    -> Cloudflare detects the repository change
    -> Cloudflare builds and deploys the new version
    -> Open the production site from Cloudflare Domains > Visit
```

---

## 3. Current File Structure

```text
gringo-calc-crc-usd/
├── README.md
├── PROJECT_STATE.md
├── index.html
├── styles.css
└── app.js
```

---

## 4. Current UI and Styling

The current application includes:

- Page title: `Gringo Calc`
- A centered calculator card
- CRC input
- Exchange Rate input
- USD input
- Clear button
- Responsive layout that remains centered as the browser is resized
- Default exchange rate of `443`
- Segoe UI-based styling
- Light gray page background
- White card with rounded corners and a subtle shadow
- Blue Clear button

### Current HTML baseline

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gringo Calc</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="page">
        <h1>Gringo Calc</h1>

        <div class="container">
            <label>CRC</label>
            <input id="crc" type="number">

            <label>Exchange Rate</label>
            <input id="rate" type="number" step="0.0001" value="443">

            <label>USD</label>
            <input id="usd" type="number" step="0.01">

            <button id="clearBtn">Clear</button>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

### Current CSS baseline

```css
body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fb;
    margin: 0;
    padding: 40px 20px;
}

.page {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
}

h1 {
    text-align: center;
    color: #1f3b5b;
    margin-bottom: 25px;
}

.container {
    background: white;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

label {
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: 600;
}

input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #d0d7de;
    border-radius: 6px;
}

input:focus {
    outline: none;
    border-color: #0d6efd;
}

button {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background: #0d6efd;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #0b5ed7;
}
```

Note: The production files should be treated as authoritative if they differ from these recorded baselines.

---

## 5. Calculation Rules

The intended formulas are:

### Calculate USD

```text
USD = CRC / Exchange Rate
```

Example:

```text
1,500,000 / 443 = 3,386.0045...
Displayed USD = 3,386.00
```

### Calculate Exchange Rate

```text
Exchange Rate = CRC / USD
```

### Calculate CRC

```text
CRC = Exchange Rate * USD
```

### Verified example values

| CRC | Exchange Rate | USD |
|---:|---:|---:|
| 2,500,000 | 443 | 5,643.34 |
| 1,500,000 | 443 | 3,386.00 |
| 1,000,000 | 443 | 2,257.34 |

---

## 6. Important Calculation Bug Already Resolved

Originally, calculation ran on every `input` event. When the user typed exchange rate `443`, JavaScript calculated after the first digit:

```text
1,500,000 / 4 = 375,000
```

After USD became populated, the original blank-field logic did not recalculate it as the user completed `44` and then `443`.

The event handling was changed from `input` to `change`, causing calculation after the user finishes editing a field and leaves it.

Current event pattern:

```javascript
crc.addEventListener("change", calculate);
rate.addEventListener("change", calculate);
usd.addEventListener("change", calculate);
```

Do not switch these back to `input` without also redesigning the calculation-state logic.

---

## 7. Current JavaScript State

The application obtains references to the three fields:

```javascript
const crc = document.getElementById("crc");
const rate = document.getElementById("rate");
const usd = document.getElementById("usd");
```

The Clear button currently clears CRC and USD and resets the exchange rate to `443`.

The production implementation also includes local-storage persistence. Because JavaScript changed over several troubleshooting iterations, retrieve the exact current `app.js` from GitHub before replacing the full file.

### Local-storage keys

The intended keys are:

```javascript
const RATE_STORAGE_KEY = "gringoCalcExchangeRate";
const CRC_STORAGE_KEY = "gringoCalcCRC";
const USD_STORAGE_KEY = "gringoCalcUSD";
```

### Intended persistence behavior

- Exchange Rate survives page reload.
- CRC survives page reload.
- USD should survive page reload.
- Clicking Clear should:
  - Clear CRC
  - Clear USD
  - Reset Exchange Rate to `443`
  - Remove stored CRC and USD
  - Store `443` as the exchange rate

### Important save-order rule

When a value is calculated programmatically, calculation must occur before values are saved:

```javascript
calculate();
saveValues();
```

Alternatively, `saveValues()` can be called immediately after assigning a calculated value.

This ordering fixed the case where USD was calculated correctly but was not persisted because storage was updated while the USD field was still blank.

---

## 8. Current Known Issue

### Exchange Rate is not calculated when CRC and USD are populated

The blank-field algorithm only calculates Exchange Rate when:

```javascript
!isNaN(crcVal) && isNaN(rateVal) && !isNaN(usdVal)
```

However, the Exchange Rate field defaults to `443` and may also be restored from local storage. Therefore, it is usually not blank. If CRC and USD are entered while Rate already contains a value, all three fields are populated and the existing blank-field logic cannot determine that Rate should be recalculated.

### Temporary usage workaround

To calculate Exchange Rate from CRC and USD:

1. Clear the Exchange Rate field.
2. Enter CRC and USD.
3. Leave the edited field so the `change` event fires.

### Recommended architectural fix

Replace the current blank-field-only decision model with explicit edit tracking. The application should track which field the user edited and which field is intended to be derived.

A robust design should define deterministic rules such as:

- CRC changed and Rate is available: calculate USD.
- Rate changed and CRC is available: calculate USD.
- USD changed and CRC is available: calculate Rate.
- If the user explicitly clears a field, calculate that field once the other two values are valid.
- Programmatic changes must not create recursive event loops.
- Recalculated values must be saved to local storage after assignment.

This state-model redesign should be completed before adding live calculations or reverting from `change` events to `input` events.

---

## 9. Validation Scenarios for the Next Implementation

Use these regression tests after changing calculation logic.

### Test A: CRC and Rate calculate USD

```text
CRC: 1500000
Rate: 443
USD: blank
Expected USD: 3386.00
```

### Test B: CRC and USD calculate Rate

```text
CRC: 1500000
Rate: blank
USD: 3386.00
Expected Rate: approximately 443.0006
```

The displayed result depends on the selected precision and the fact that USD has already been rounded to two decimals.

### Test C: Rate and USD calculate CRC

```text
CRC: blank
Rate: 443
USD: 3386.00
Expected CRC: 1499998.00
```

This result reflects multiplication of the rounded USD value. Using the unrounded USD result would reproduce 1,500,000 exactly.

### Test D: Rate entry does not calculate prematurely

```text
CRC: 1500000
Type Rate: 443
Expected final USD after leaving Rate: 3386.00
Must not remain at 375000.00
```

### Test E: Persistence

1. Enter valid values.
2. Complete the calculation.
3. Reload the page.
4. Confirm CRC, Rate, and USD are restored.

### Test F: Clear

1. Select Clear.
2. Confirm CRC and USD are blank.
3. Confirm Rate is `443`.
4. Reload.
5. Confirm the cleared state persists.

### Test G: Invalid and zero values

The application should not divide by zero, save invalid numbers, or display `Infinity` or `NaN`.

---

## 10. Deferred Enhancement: CRC Number Formatting

Thousands separators and locale formatting are intentionally deferred.

Reason: CRC formatting conventions need to be handled deliberately rather than assuming U.S. number formatting. Do not add comma-based formatting until the desired CRC input and display convention is explicitly defined.

---

## 11. Suggested Next Work Item

### Priority: Redesign field calculation state

The next chat should begin with the known Exchange Rate issue and the production `app.js` file.

Recommended opening request:

```text
Continue the Gringo Calc project using the attached PROJECT_STATE.md and my current app.js.

Please redesign the three-field calculation logic so that CRC, Exchange Rate, and USD can each be calculated reliably from the other two. Preserve:
- change-event behavior unless a safer live-input design is implemented
- localStorage persistence for all three fields
- Clear button behavior
- default Exchange Rate of 443
- protection against zero, NaN, Infinity, and recursive event handling

First, review the current app.js and propose the state rules. Then provide the complete corrected app.js and a regression test checklist.
```

---

## 12. Future Enhancement Backlog

After the calculation-state issue is fixed and fully tested:

1. Validation messages for incomplete or invalid combinations
2. Visual indication of calculated versus user-entered values
3. Saved-rate timestamp
4. Improved keyboard workflow and Enter-key behavior
5. Mobile refinements
6. Installable Progressive Web App support
7. Conversion history
8. CSV export
9. Optional live exchange-rate API
10. Costa Rica-specific number formatting after requirements are clarified
11. Optional payment split calculator for deposit and final-payment scenarios
12. Custom domain

---

## 13. Handoff Notes

- Treat the GitHub repository as the source of truth for current production code.
- Do not paste literal `<br>` tags into JavaScript or CSS files. They appeared in chat-rendered code during troubleshooting but do not belong in source files.
- Ensure `index.html` loads JavaScript using:

```html
<script src="app.js"></script>
```

- After a GitHub commit, verify Cloudflare deployment status before testing.
- If the deployed site appears stale, confirm the latest deployment succeeded and perform a forced browser refresh.
- Continue making and testing one focused change at a time.
