const crc = document.getElementById("crc");
const rate = document.getElementById("rate");
const usd = document.getElementById("usd");
const RATE_STORAGE_KEY = "gringoCalcExchangeRate";
const CRC_STORAGE_KEY = "gringoCalcCRC";
const USD_STORAGE_KEY = "gringoCalcUSD";

const savedRate = localStorage.getItem(RATE_STORAGE_KEY);
const savedCRC = localStorage.getItem(CRC_STORAGE_KEY);
const savedUSD = localStorage.getItem(USD_STORAGE_KEY);
const DEBOUNCE_DELAY = 1500; // 1.5 seconds
const LAST_EDITED_STORAGE_KEY = "gringoCalcLastEditedField";
const numberWords = document.getElementById("numberWords");
const inverseRateLabel = document.getElementById("inverseRateLabel");

const ONES = [
    "", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen",
    "fifteen", "sixteen", "seventeen",
    "eighteen", "nineteen"
];

const TENS = [
    "", "", "twenty", "thirty", "forty",
    "fifty", "sixty", "seventy", "eighty", "ninety"
];

let focusedField = "crc";
let calculationTimer = null;
let lastEditedField = "crc";
let isCalculating = false;

const savedLastEdited =
    localStorage.getItem(LAST_EDITED_STORAGE_KEY);

if (savedLastEdited) {
    lastEditedField = savedLastEdited;
}

if (savedRate !== null) rate.value = savedRate;
if (savedCRC !== null) crc.value = savedCRC;
if (savedUSD !== null) usd.value = savedUSD;

document.getElementById("clearBtn")
    .addEventListener("click", () => {
        clearTimeout(calculationTimer);
        calculationTimer = null;
        crc.value = "";
        usd.value = "";
        rate.value = "";
        numberWords.textContent = "";
        updateInverseRateLabel();
        lastEditedField = "crc";
        localStorage.removeItem(RATE_STORAGE_KEY);
        localStorage.removeItem(CRC_STORAGE_KEY);
        localStorage.removeItem(USD_STORAGE_KEY);
    });

function calculate(changedField) {
    if (isCalculating) {
        return;
    }

    isCalculating = true;

    try {
        const crcVal = parseCRC(crc.value);
        const rateVal = parseFloat(rate.value);
        const usdVal = parseFloat(usd.value);

        const validCRC =
            Number.isFinite(crcVal) && crcVal > 0;

        const validRate =
            Number.isFinite(rateVal) && rateVal > 0;

        const validUSD =
            Number.isFinite(usdVal) && usdVal > 0;

        console.log("Changed field:", changedField);
        console.log("Authoritative field:", lastEditedField);
        console.log("CRC:", crcVal);
        console.log("RATE:", rateVal);
        console.log("USD:", usdVal);

        switch (changedField) {
            case "crc":
                if (validCRC && validRate) {
                    const result = crcVal / rateVal;

                    if (Number.isFinite(result) && result > 0) {
                        usd.value = formatUSD(result);
                        console.log("CALCULATED USD:", result);
                    }
                }
                break;

            case "usd":
                if (validUSD && validRate) {
                    const result = usdVal * rateVal;

                    if (Number.isFinite(result) && result > 0) {
                        crc.value = formatCRC(result);
                        console.log("CALCULATED CRC:", result);
                    }
                }
                break;

            case "rate":
                /*
                 * If Rate is blank or invalid, derive it from
                 * CRC and USD when both are valid.
                 */
                if (!validRate) {
                    if (validCRC && validUSD) {
                        const result = crcVal / usdVal;

                        if (Number.isFinite(result) && result > 0) {
                            rate.value = result.toFixed(4);
                            console.log("CALCULATED RATE:", result);
                        }
                    }

                    break;
                }

                /*
                 * A valid Rate edit preserves whichever monetary
                 * field was edited most recently.
                 */
                if (lastEditedField === "usd" && validUSD) {
                    const result = usdVal * rateVal;

                    if (Number.isFinite(result) && result > 0) {
                        crc.value = formatCRC(result);
                        console.log("CALCULATED CRC:", result);
                    }
                } else if (validCRC) {
                    const result = crcVal / rateVal;

                    if (Number.isFinite(result) && result > 0) {
                        usd.value = formatUSD(result);
                        console.log("CALCULATED USD:", result);
                    }
                }
                break;

            default:
                console.warn("Unknown field:", changedField);
        }
    } finally {
        isCalculating = false;
        saveValues();
        updateInverseRateLabel();
        updateNumberWordsDisplay();
    }
}

function updateInverseRateLabel() {
    const rateVal = parseFloat(rate.value);

    if (!Number.isFinite(rateVal) || rateVal <= 0) {
        inverseRateLabel.textContent = "";
        return;
    }

    inverseRateLabel.textContent = `(${(1 / rateVal).toFixed(8)})`;
}

function formatCRC(value) {
    if (!Number.isFinite(value)) {
        return "";
    }

    return value.toLocaleString("de-DE", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

function formatUSD(value) {
    if (!Number.isFinite(value)) {
        return "";
    }

    const rounded = value.toFixed(2);

    // Extend precision only when 2 decimals would hide a nonzero amount.
    if (parseFloat(rounded) === 0 && value > 0) {
        return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, ".0");
    }

    return rounded;
}

function parseCRC(text) {
    console.log("parseCRC input:", text);
    console.log("parseCRC type:", typeof text);

    if (!text) {
        console.log("parseCRC: empty input");
        return NaN;
    }

    const normalized = String(text).trim().replace(/\s+/g, "");

    if (!normalized) {
        console.log("parseCRC: empty normalized input");
        return NaN;
    }

    let cleaned = normalized;

    if (normalized.includes(",") && normalized.includes(".")) {
        const lastComma = normalized.lastIndexOf(",");
        const lastDot = normalized.lastIndexOf(".");

        if (lastComma > lastDot) {
            cleaned = normalized.replace(/\./g, "").replace(",", ".");
        } else {
            cleaned = normalized.replace(/,/g, "");
        }
    } else if (normalized.includes(",")) {
        const commaIndex = normalized.lastIndexOf(",");
        const decimalPart = normalized.slice(commaIndex + 1);

        if (decimalPart.length <= 2) {
            const integerPart = normalized.slice(0, commaIndex).replace(/\./g, "");
            cleaned = integerPart + "." + decimalPart;
        } else {
            cleaned = normalized.replace(/,/g, "");
        }
    } else if (normalized.includes(".")) {
        const lastDot = normalized.lastIndexOf(".");
        const lastPart = normalized.slice(lastDot + 1);

        // A 3-digit group after the final dot is a thousands separator,
        // not a decimal (CRC formatting never has 3-digit cents).
        if (lastPart.length === 3) {
            cleaned = normalized.replace(/\./g, "");
        } else if (lastPart.length === 1 || lastPart.length === 2) {
            cleaned = normalized.slice(0, lastDot).replace(/\./g, "") + "." + lastPart;
        } else {
            cleaned = normalized.replace(/\./g, "");
        }
    }

    console.log("parseCRC cleaned:", cleaned);

    const result = Number(cleaned);

    console.log("parseCRC result:", result);

    return result;
}

function numberToWords(num) {
    num = Math.floor(num);

    if (num === 0) {
        return "zero";
    }

    function convert(n) {
        if (n < 20) {
            return ONES[n];
        }

        if (n < 100) {
            const tensPart = TENS[Math.floor(n / 10)];
            const onesPart = n % 10;

            return tensPart + (onesPart ? "-" + ONES[onesPart] : "");
        }

        if (n < 1000) {
            return ONES[Math.floor(n / 100)] +
                " hundred" +
                (n % 100 ? " " + convert(n % 100) : "");
        }

        if (n < 1000000) {
            return convert(Math.floor(n / 1000)) +
                " thousand" +
                (n % 1000 ? " " + convert(n % 1000) : "");
        }

        return convert(Math.floor(n / 1000000)) +
            " million" +
            (n % 1000000 ? " " + convert(n % 1000000) : "");
    }

    return convert(num);
}

function getWholeAndFractionalParts(value) {
    const absoluteValue = Math.abs(value);
    const whole = Math.floor(absoluteValue);
    const fractional = Math.round((absoluteValue - whole) * 100);

    if (fractional === 100) {
        return {
            whole: whole + 1,
            fractional: 0
        };
    }

    return {
        whole,
        fractional
    };
}

function formatNumberWithCurrency(value, field) {
    if (!Number.isFinite(value) || value <= 0) {
        return "";
    }

    const { whole, fractional } = getWholeAndFractionalParts(value);

    let wholeLabel = "";
    let fractionalLabel = "";

    switch (field) {
        case "crc":
            wholeLabel = whole === 1 ? " colon" : " colones";
            fractionalLabel = fractional === 1 ? " centimo" : " centimos";
            break;

        case "usd":
            wholeLabel = whole === 1 ? " dollar" : " dollars";
            fractionalLabel = fractional === 1 ? " cent" : " cents";
            break;

        case "rate":
            wholeLabel = whole === 1 ? " colon per dollar" : " colones per dollar";
            fractionalLabel = fractional === 1 ? " centavo" : " centavos";
            break;

        default:
            return numberToWords(whole);
    }

    const text = numberToWords(whole) + wholeLabel +
        (fractional > 0 ? " and " + numberToWords(fractional) + fractionalLabel : "");

    return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateNumberWordsDisplay() {
    let value;
    let fieldName;

    switch (focusedField) {
        case "crc":
            value = parseCRC(crc.value);
            fieldName = "crc";
            break;

        case "usd":
            value = parseFloat(usd.value);
            fieldName = "usd";
            break;

        case "rate":
            value = parseFloat(rate.value);
            fieldName = "rate";
            break;

        default:
            numberWords.textContent = "";
            return;
    }

    const text = formatNumberWithCurrency(value, fieldName);
    numberWords.textContent = text;
}

function saveValues() {
    localStorage.setItem(LAST_EDITED_STORAGE_KEY, lastEditedField);
    localStorage.setItem(RATE_STORAGE_KEY, rate.value);
    localStorage.setItem(CRC_STORAGE_KEY, crc.value);
    localStorage.setItem(USD_STORAGE_KEY, usd.value);
}

function scheduleCalculation(fieldName) {
    clearTimeout(calculationTimer);

    calculationTimer = setTimeout(() => {
        calculate(fieldName);
    }, DEBOUNCE_DELAY);
}

/// event handlers
// CRC
crc.addEventListener("focus", () => {
    focusedField = "crc";
    updateNumberWordsDisplay();

});
crc.addEventListener("input", () => {
    lastEditedField = "crc";
    saveValues();
    updateNumberWordsDisplay();
    scheduleCalculation("crc");
});

crc.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;

    console.log("CRC raw:", crc.value);

    const value = parseCRC(crc.value);

    console.log("CRC parsed:", value);

    if (Number.isFinite(value) && value > 0) {
        crc.value = formatCRC(value);
    }

    lastEditedField = "crc";
    calculate("crc");
});

// Exchange Rate
rate.addEventListener("focus", () => {
    focusedField = "rate";

    updateNumberWordsDisplay();
});

rate.addEventListener("input", () => {
    /*
     * Do not change lastEditedField here.
     * The most recently edited monetary field remains authoritative.
     */
    saveValues();
    updateInverseRateLabel();
    updateNumberWordsDisplay();
    scheduleCalculation("rate");
});

rate.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;
    calculate("rate");
});

// USD
usd.addEventListener("focus", () => {
    focusedField = "usd";
    updateNumberWordsDisplay();
});

usd.addEventListener("input", () => {
    lastEditedField = "usd";
    saveValues();
    updateNumberWordsDisplay();
    scheduleCalculation("usd");
});

usd.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;
    lastEditedField = "usd";
    calculate("usd");
});

updateInverseRateLabel();
