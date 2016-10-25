var UK = (function () {

    let output = {
        grossMonth: 0,
        netYear: 0,
        netMonth: 0,
        incomeTax: 0,
        taxableYear: 0,
        nationalInsurance: 0,
        grossYear: 0,
    };

    var calculate = function calculate(inputAmount) {
        console.log("UK: calculating from values, amount: " + inputAmount);
        let grossYear = inputAmount || 0;
        output.taxableYear = grossYear;
        output.grossMonth = ~~(grossYear / 12);
        output.netYear = grossYear - getTaxAmount(output.taxableYear) - getNationalInsurance(output.taxableYear);
        output.nationalInsurance = getNationalInsurance(output.taxableYear);
        output.netMonth = ~~(output.netYear / 12);
        output.incomeTax = getTaxAmount(output.taxableYear);
        output.grossYear = inputAmount
    }

    function getNationalInsurance(taxableIncome = 0) {
        taxableIncome = taxableIncome / 12;
        const NIAmountPeriods = [
            672.01,
            2910.99,
            Infinity
        ];
        let taxRates = [0, .12, .02];
        let taxAmount = 0;
        for (let i = 0; i < taxRates.length; i++) {
            if (taxableIncome - NIAmountPeriods[i] < 0) {
                taxAmount += taxableIncome * taxRates[i];
                break;
            } else {
                taxAmount += NIAmountPeriods[i] * taxRates[i];
                taxableIncome = taxableIncome - NIAmountPeriods[i];
            }
        }
        return Math.floor(taxAmount * 12);
    }

    function getTaxAmount(taxableIncome = 0) {
        //TODO:  no personal allowance for over 120.000!
        const taxAmountPeriods = [
            11000, // 0 - 19,922
            32000, // 33,715 - 19,922
            107000, // 66,421 - 33,715
            Infinity
        ];
        let taxRates = [0, .20, .40, .45];
        let taxAmount = 0;
        for (let i = 0; i < taxRates.length; i++) {
            if (taxableIncome - taxAmountPeriods[i] < 0) {
                taxAmount += Math.floor(taxableIncome * taxRates[i]);
                break;
            } else {
                taxAmount += Math.floor(taxAmountPeriods[i] * taxRates[i]);
                taxableIncome = taxableIncome - taxAmountPeriods[i];
            }
        }
        return taxAmount;
    }

    return {
        calculate: calculate,
        breakdown: output
    }

})();
