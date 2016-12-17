var CalculatorModel = require('./base-model.js');
var calculator = require('../calculator/nl-calculator.js');

module.exports = new CalculatorModel('NL', calculator, {
    ruling30: false,
    holidayAllowance: false,
    socialSecurity: true,
    rounding: 0,
    currency: null,
    calculatorCurrency : 'EUR'
});
