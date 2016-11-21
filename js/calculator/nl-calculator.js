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
        socialSecurity: true
    };

    var calculate = function calculate(inputAmount, settings = defaultSettings) {
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

        return {
            grossYear: round(grossYear, settings),
            grossMonth: round(grossMonth, settings),
            taxableYear: round(taxableYear, settings),
            generalCredit: round(generalCredit, settings),
            labourCredit: round(labourCredit, settings),
            incomeTax: round(incomeTax, settings),
            netYear: round(netYear, settings),
            netMonth: round(netMonth, settings)
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

    function round(value, settings) {
        if (settings.rounding !== undefined && settings.rounding != null) {
            value = value.toFixed(settings.rounding)
        }
        return value;
    }


    return {
        calculate: calculate
    }

})();
