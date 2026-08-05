const crc = document.getElementById("crc");
const rate = document.getElementById("rate");
const usd = document.getElementById("usd");

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
    }
}

crc.addEventListener("change", calculate);
rate.addEventListener("change", calculate);
usd.addEventListener("change", calculate);
