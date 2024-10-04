"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("currency1");
    const fromCurrencySelect = document.getElementById("select1");
    const toCurrencySelect = document.getElementById("select2");
    const convertButton = document.getElementById("convert");
    const resultInput = document.getElementById("currency2");
    const swapButton = document.getElementById("swap");
    const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD"; // Example API URL
    function fetchCurrencyData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(apiUrl);
                const data = yield response.json();
                populateCurrencyOptions(data.rates);
            }
            catch (error) {
                console.error("Error fetching currency data:", error);
                resultInput.value = ""; // Clear the output field on error
            }
        });
    }
    function populateCurrencyOptions(rates) {
        const currencies = Object.keys(rates);
        fromCurrencySelect.innerHTML = "";
        toCurrencySelect.innerHTML = "";
        currencies.forEach((currency) => {
            fromCurrencySelect.add(new Option(currency, currency));
            toCurrencySelect.add(new Option(currency, currency));
        });
    }
    function convertCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = parseFloat(amountInput.value);
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount to convert."); // Alert the user
                resultInput.value = ""; // Clear if input is invalid
                return;
            }
            try {
                const response = yield fetch(apiUrl);
                const data = yield response.json();
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultInput.value = convertedAmount; // Set the converted amount
            }
            catch (error) {
                console.error("Error during conversion:", error);
                resultInput.value = ""; // Clear output field on error
            }
        });
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
