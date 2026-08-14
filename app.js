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

let calculationTimer = null;
let lastEditedField = "crc";
let isCalculating = false;

if (savedRate) rate.value = savedRate;
if (savedCRC) crc.value = savedCRC;
if (savedUSD) usd.value = savedUSD;

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
        const crcVal = parseFloat(crc.value);
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
                        crc.value = result.toFixed(2);
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
                        crc.value = result.toFixed(2);
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

function saveValues() {

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
crc.addEventListener("input", () => {
    lastEditedField = "crc";
    saveValues();
    scheduleCalculation("crc");
});

crc.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;
    lastEditedField = "crc";
    calculate("crc");
});

// Exchange Rate
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
usd.addEventListener("input", () => {
    lastEd*tedField = "usd";
    saveValues();
    scheduleCalculation("usd");
}*;

usd.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculationTimer = null;
    lastEditedField = "usd";
    calculate("usd");
});
