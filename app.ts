document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("currency1") as HTMLInputElement;
  const fromCurrencySelect = document.getElementById(
    "select1"
  ) as HTMLSelectElement;
  const toCurrencySelect = document.getElementById(
    "select2"
  ) as HTMLSelectElement;
  const convertButton = document.getElementById("convert") as HTMLButtonElement;
  const resultInput = document.getElementById("currency2") as HTMLInputElement;
  const swapButton = document.getElementById("swap") as HTMLButtonElement;

  const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD"; // Example API URL

  async function fetchCurrencyData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateCurrencyOptions(data.rates);
    } catch (error) {
      console.error("Error fetching currency data:", error);
      resultInput.value = ""; // Clear the output field on error
    }
  }

  function populateCurrencyOptions(rates: Record<string, number>) {
    const currencies = Object.keys(rates);
    fromCurrencySelect.innerHTML = "";
    toCurrencySelect.innerHTML = "";

    currencies.forEach((currency) => {
      fromCurrencySelect.add(new Option(currency, currency));
      toCurrencySelect.add(new Option(currency, currency));
    });
  }

  async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount to convert."); // Alert the user
      resultInput.value = ""; // Clear if input is invalid
      return;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const rate = data.rates[toCurrency] / data.rates[fromCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      resultInput.value = convertedAmount; // Set the converted amount
    } catch (error) {
      console.error("Error during conversion:", error);
      resultInput.value = ""; // Clear output field on error
    }
  }

  function swapCurrencies() {
    const tempCurrency = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempCurrency;
    convertCurrency(); // Trigger conversion after swapping
  }

  convertButton.addEventListener("click", convertCurrency);

  swapButton.addEventListener("click", swapCurrencies);
  fetchCurrencyData(); // Initialize currency options on page load
});
