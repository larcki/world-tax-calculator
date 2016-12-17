var currencyConverter = require("./currency-converter");

module.exports = (function () {

    const taxBrackets = new Map([
        [32000, .20],
        [107000, .40],
        [Infinity, .45]
    ]);

    const niBrackets = new Map([
        [672.01, 0],
        [2910.99, .12],
        [Infinity, .02]
    ]);

    const defaultPersonalAllowance = 11000;

    let defaultSettings = {
        nationalInsurance: true
    };

    var calculate = function calculate(inputAmount, settings = defaultSettings) {
        inputAmount = currencyConverter(inputAmount, settings.currency, settings.calculatorCurrency);
        let grossYear = inputAmount || 0;
        let grossMonth = grossYear / 12;
        let personalAllowance = getPersonalAllowance(grossYear);
        let taxableYear = grossYear - personalAllowance;
        let incomeTax = getTax(taxableYear);
        let nationalInsurance = settings.nationalInsurance ? getNationalInsurance(grossYear) : 0;
        let netYear = grossYear - incomeTax - nationalInsurance;
        let netMonth = netYear / 12;
        let totalDeductionRate = (netYear / inputAmount - 1) * -1;
        return {
            grossYear: convertAndRound(grossYear, settings),
            grossMonth: convertAndRound(grossMonth, settings),
            taxableYear: convertAndRound(taxableYear, settings),
            personalAllowance: convertAndRound(personalAllowance, settings),
            incomeTax: convertAndRound(incomeTax, settings),
            nationalInsurance: convertAndRound(nationalInsurance, settings),
            netYear: convertAndRound(netYear, settings),
            netYearHomeCurrency: round(netYear, settings),
            totalDeductionRate: round(totalDeductionRate * 100, 1),
            netMonth: convertAndRound(netMonth, settings)
        };
    };

    function getPersonalAllowance(grossYear) {
        if (grossYear <= defaultPersonalAllowance) {
            return grossYear;
        }
        var surplus = grossYear - 100000;
        if (surplus <= 0) {
            return defaultPersonalAllowance;
        }
        var personalAllowance = defaultPersonalAllowance - surplus / 2;
        return (personalAllowance < 0) ? 0 : personalAllowance;
    }

    function getNationalInsurance(taxableIncome = 0) {
        taxableIncome = taxableIncome / 12;
        let taxAmount = 0;
        for (var [amount, taxRate] of niBrackets) {
            if (taxableIncome - amount < 0) {
                taxAmount += taxableIncome * taxRate;
                break;
            } else {
                taxAmount += amount * taxRate;
                taxableIncome = taxableIncome - amount;
            }
        }
        return taxAmount * 12;
    }

    function getTax(taxableIncome = 0) {
        let taxAmount = 0;
        for (var [amount, taxRate] of taxBrackets) {
            if (taxableIncome - amount < 0) {
                taxAmount += taxableIncome * taxRate;
                break;
            } else {
                taxAmount += amount * taxRate;
                taxableIncome = taxableIncome - amount;
            }
        }
        return taxAmount;
    }

    function convertAndRound(value, settings) {
        value = currencyConverter(value, settings.calculatorCurrency, settings.currency);
        return round(value, settings.rounding);
    }

    function round(value, rounding) {
        if (rounding !== undefined && rounding != null) {
            value = value.toFixed(rounding)
        }
        return value;
    }

    return {
        calculate: calculate
    }

})();
