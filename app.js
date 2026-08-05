const crc = document.getElementById("crc");
const rate = document.getElementById("rate");
const usd = document.getElementById("usd");
const RATE_STORAGE_KEY = "gringoCalcExchangeRate";
const CRC_STORAGE_KEY = "gringoCalcCRC";
const USD_STORAGE_KEY = "gringoCalcUSD";

const savedRate = localStorage.getItem(RATE_STORAGE_KEY);
const savedCRC = localStorage.getItem(CRC_STORAGE_KEY);
const savedUSD = localStorage.getItem(USD_STORAGE_KEY);

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

function calculate() {

    const crcVal = parseFloat(crc.value);
    const rateVal = parseFloat(rate.value);
    const usdVal = parseFloat(usd.value);

    console.log("CRC:", crcVal);
    console.log("RATE:", rateVal);
    console.log("USD:", usdVal);

    if (!isNaN(crcVal) && !isNaN(rateVal) && isNaN(usdVal)) {
        const result = crcVal / rateVal;
        console.log("CALCULATED USD:", result);
        usd.value = result.toFixed(2);
        saveValues();
    }
}

function saveValues() {

    localStorage.setItem(RATE_STORAGE_KEY, rate.value);
    localStorage.setItem(CRC_STORAGE_KEY, crc.value);
    localStorage.setItem(USD_STORAGE_KEY, usd.value);

}

crc.addEventListener("change", () => {
    saveValues();
    calculate();
});

rate.addEventListener("change", () => {
    const value = parseFloat(rate.value);
    if (!isNaN(value) && value > 0) {
        localStorage.setItem(RATE_STORAGE_KEY, value);
    }
    saveValues();
    calculate();

});

usd.addEventListener("change", () => {
    saveValues();
    calculate();
});
