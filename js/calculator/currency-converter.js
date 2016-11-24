let GBP_IN_EUR = 1.180;

(function updateRate() {
    if (typeof $ !== 'undefined') {
        $.getJSON("http://api.fixer.io/latest?base=GBP&symbols=EUR", function (data) {
            GBP_IN_EUR = data.rates.EUR;
        })
    }
})();


module.exports = function (value, currency, expectedCurrency) {

    if (currency === expectedCurrency || expectedCurrency == null || currency == null) {
        return value;
    }

    if (currency === 'EUR' && expectedCurrency === 'GBP') {
        return value / GBP_IN_EUR;
    }

    if (currency === 'GBP' && expectedCurrency === 'EUR') {
        return value * GBP_IN_EUR;
    }

};
