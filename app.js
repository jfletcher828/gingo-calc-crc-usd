const crc = document.getElementById("crc");
const rate = document.getElementById("rate");
const usd = document.getElementById("usd");

function calculate() {

    const crcVal = parseFloat(crc.value);
    const rateVal = parseFloat(rate.value);
    const usdVal = parseFloat(usd.value);

    if (!isNaN(crcVal) && !isNaN(rateVal) && isNaN(usdVal)) {
        usd.value = (crcVal / rateVal).toFixed(2);
    }
    else if (!isNaN(crcVal) && isNaN(rateVal) && !isNaN(usdVal)) {
        rate.value = (crcVal / usdVal).toFixed(4);
    }
    else if (isNaN(crcVal) && !isNaN(rateVal) && !isNaN(usdVal)) {
        crc.value = (rateVal * usdVal).toFixed(2);
    }
}

crc.addEventListener("input", calculate);
rate.addEventListener("input", calculate);
usd.addEventListener("input", calculate);
``
