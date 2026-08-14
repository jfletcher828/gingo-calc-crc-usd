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

if (savedRate) rate.value = savedRate;
if (savedCRC) crc.value = savedCRC;
if (savedUSD) usd.value = savedUSD;

document.getElementById("clearBtn")
    .addEventListener("click", () => {

        crc.value = "";
        usd.value = "";
        rate.value = "443";

        localStorage.removeItem(CRC_STORAGE_KEY);
        localStorage.removeItem(USD_STORAGE_KEY);

        localStorage.setItem(RATE_STORAGE_KEY, "443");

    });

function calculate(changedField) {
    const crcVal = parseFloat(crc.value);
    const rateVal = parseFloat(rate.value);
    const usdVal = parseFloat(usd.value);

    console.log("Changed field:", changedField);
    console.log("CRC:", crcVal);
    console.log("RATE:", rateVal);
    console.log("USD:", usdVal);

    switch (changedField) {

        case "crc":
            if (!isNaN(crcVal) && !isNaN(rateVal)) {
                const result = crcVal / rateVal;

                console.log("CALCULATED USD:", result);

                if (isFinite(result)) {
                    usd.value = result.toFixed(2);
                    saveValues();
                }
            }
            break;

        case "rate":
            if (!isNaN(crcVal) && !isNaN(rateVal)) {
                const result = crcVal / rateVal;

                console.log("CALCULATED USD:", result);

                if (isFinite(result)) {
                    usd.value = result.toFixed(2);
                    saveValues();
                }
            }
            break;

        case "usd":
            if (!isNaN(crcVal) && !isNaN(usdVal) && usdVal > 0) {
                const result = crcVal / usdVal;

                console.log("CALCULATED RATE:", result);

                if (isFinite(result)) {
                    rate.value = result.toFixed(4);
                    saveValues();
                }
            }
            break;

        default:
            console.warn("Unknown field:", changedField);
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
    saveValues();
    scheduleCalculation("crc");
});

crc.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculate("crc");
});

// Exchange Rate
rate.addEventListener("input", () => {
    saveValues();
    scheduleCalculation("rate");
});

rate.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculate("rate");
});

// USD
usd.addEventListener("input", () => {
    saveValues();
    scheduleCalculation("usd");
});

usd.addEventListener("blur", () => {
    clearTimeout(calculationTimer);
    calculate("usd");
});
