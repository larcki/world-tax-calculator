var currencyConverter = require("./currency-converter");

module.exports = (function () {

    const taxBrackets = new Map([
        [19922, {normal: .3655, noSocialSecurity: .0835}],
        [13793, {normal: .404, noSocialSecurity: .1385}],
        [32697, {normal: .404, noSocialSecurity: .404}],
        [Infinity, {normal: .52, noSocialSecurity: .52}]
    ]);

    const defaultSettings = {
        holidayAllowance: false,
        ruling30: false,
        socialSecurity: true,
        currency: null
    };

    var calculate = function calculate(inputAmount, settings = defaultSettings) {
        inputAmount = currencyConverter(inputAmount, settings.currency, settings.calculatorCurrency);
        let grossYear = inputAmount || 0;
        if (settings.holidayAllowance) {
            grossYear = +inputAmount / 1.08;
        }
        let grossMonth = grossYear / 12;
        let taxableYear = settings.ruling30 ? grossYear * 0.7 : grossYear;
        let generalCredit = getGeneralDiscount(taxableYear);
        let labourCredit = getLabourDiscount(taxableYear);
        let incomeTax = getTaxAmount(taxableYear, settings.socialSecurity);
        let netYear = grossYear - incomeTax + generalCredit + labourCredit;
        let netMonth = netYear / 12;
        let totalDeductionRate = (netYear / inputAmount - 1) * -1;

        return {
            grossYear: convertAndRound(grossYear, settings),
            grossMonth: convertAndRound(grossMonth, settings),
            taxableYear: convertAndRound(taxableYear, settings),
            generalCredit: convertAndRound(generalCredit, settings),
            labourCredit: convertAndRound(labourCredit, settings),
            incomeTax: convertAndRound(incomeTax, settings),
            netYear: convertAndRound(netYear, settings),
            netYearHomeCurrency: round(netYear, settings),
            totalDeductionRate: round(totalDeductionRate * 100, 1),
            netMonth: convertAndRound(netMonth, settings)
        };
    };

    function getTaxAmount(taxableIncome, socialSecurity) {
        let taxAmount = 0;
        for (var [key, value] of taxBrackets) {
            if (taxableIncome - key < 0) {
                taxAmount += (taxableIncome * (socialSecurity ? value.normal : value.noSocialSecurity));
                break;
            } else {
                taxAmount += (key * (socialSecurity ? value.normal : value.noSocialSecurity));
                taxableIncome = taxableIncome - key;
            }
        }
        return taxAmount;
    }

    function getLabourDiscount(taxableYear) {
        if (taxableYear < 9147) {
            return taxableYear * 1.793 / 100;
        }
        if (taxableYear < 19758) {
            return 164 + (taxableYear - 9147) * 27.698 / 100;
        }
        if (taxableYear < 34015) {
            return 3103;
        }
        if (taxableYear < 111590) {
            return 3103 - (taxableYear - 39015) * 4 / 100;
        }
        return 0;
    }

    function getGeneralDiscount(taxableYear) {
        if (taxableYear < 19922) {
            return 2242;
        }
        if (taxableYear < 66417) {
            return 2242 - (taxableYear - 19922) * 4.822 / 100;
        }
        return 0;
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
