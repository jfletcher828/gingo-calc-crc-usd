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
        rate.value = "443";
        lastEditedField = "crc";
        localStorage.removeItem(CRC_STORAGE_KEY);
        localStorage.removeItem(USD_STORAGE_KEY);
        localStorage.setItem(RATE_STORAGE_KEY, "443");
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
                        usd.value = result.toFixed(2);
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
                        usd.value = result.toFixed(2);
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
    }
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

function parseCRC(text) {
    console.log("parseCRC input:", text);
    console.log("parseCRC type:", typeof text);

    if (!text) {
        console.log("parseCRC: empty input");
        return NaN;
    }

    const cleaned = String(text)
        .replace(/\./g, "")
        .replace(",", ".");

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
            return TENS[Math.floor(n / 10)] +
                (n % 10 ? " " + ONES[n % 10] : "");
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

function updateNumberWordsDisplay() {
    let value;
    let suffix;

    switch (focusedField) {
        case "crc":
            value = parseCRC(crc.value);
            suffix = " colones";
            break;

        case "usd":
            value = parseFloat(usd.value);
            suffix = " dollars";
            break;

        case "rate":
            value = parseFloat(rate.value);
            suffix = " colones per dollar";
            break;

        default:
            numberWords.textContent = "";
            return;
    }

    if (!Number.isFinite(value) || value <= 0) {
        numberWords.textContent = "";
        return;
    }

    numberWords.textContent =
        numberToWords(value) + suffix;
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
    scheduleCalculation("usd");
});

usd.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;
    lastEditedField = "usd";
    calculate("usd");
});
