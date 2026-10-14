const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swap");
const loader = document.getElementById("loader");

// API URL (FREE, no API key needed)
const API_URL = "https://api.exchangerate-api.com/v4/latest/";

// Currency List
const currencies = ["USD","INR","EUR","GBP","JPY","AUD","CAD","CNY"];

currencies.forEach(currency => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

// Default values
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Fetch & Convert
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if(amount === "" || amount <= 0){
    result.innerText = "Enter valid amount";
    return;
  }

  loader.style.display = "block";
  result.innerText = "";

  try {
    const res = await fetch(API_URL + from);
    const data = await res.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching data";
  }

  loader.style.display = "none";
}

// Events
amountInput.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

// Swap currencies
swapBtn.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
});

// Initial call
convertCurrency();