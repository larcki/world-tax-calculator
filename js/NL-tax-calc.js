var NL = (function () {

    let output = {
        generalCredit: 0,
        labourCredit: 0,
        grossMonth: 0,
        netYear: 0,
        netMonth: 0,
        incomeTax: 0,
        taxableYear: 0,
        grossYear: 0
    };

    var calculate = function calculate(inputAmount, settings) {
        let inputAllowance = settings.holidayAllowance;
        let inputRuling = settings.ruling30;
        console.log("NL: calculating from values, amount: " + inputAmount + ", allowance:" + inputAllowance + ", ruling:" + inputRuling);
        let grossYear = inputAmount || 0;
        if (inputAllowance) {
            grossYear = +inputAmount / 1.08; //-8%
        }
        output.taxableYear = grossYear;
        if (inputRuling) {
            output.taxableYear = output.taxableYear * 0.7;
        }
        output.generalCredit = getAlgemeneHeffingskorting(output.taxableYear);
        output.labourCredit = getArbeidskorting(output.taxableYear);
        output.grossMonth = ~~(grossYear / 12);
        output.netYear = grossYear - getTaxAmount(output.taxableYear);
        output.netYear += output.generalCredit + output.labourCredit;
        output.netMonth = ~~(output.netYear / 12);
        output.incomeTax = getTaxAmount(output.taxableYear);
        output.grossYear = inputAmount
    }


    function getTaxAmount(taxableIncome = 0) {

        const taxAmountPeriods = [
            19922, // 0 - 19,922
            13793, // 33,715 - 19,922
            32697, // 66,421 - 33,715
            Infinity
        ];
        let taxRates = [.3655, .404, .404, .52];
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

    //labor discount
    function getArbeidskorting(salary) {
        if (salary < 9147) {
            return salary * 1.793 / 100;
        }
        if (salary < 19758) {
            return 164 + (salary - 9147) * 27.698 / 100;
        }
        if (salary < 34015) {
            return 3103;
        }
        if (salary < 111590) {
            return 3103 - (salary - 39015) * 4 / 100;
        }

        return 0;
    }

    //general discount
    function getAlgemeneHeffingskorting(salary) {
        if (salary < 19922) {
            return 2242;
        }
        if (salary < 66417) {
            return 2242 - (salary - 19922) * 4.822 / 100;
        }

        return 0;
    }

    return {
        calculate: calculate,
        breakdown: output,
    }

})();
