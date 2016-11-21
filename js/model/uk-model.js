var CalculatorModel = require('./base-model.js');
var calculator = require('../calculator/uk-calculator.js');

module.exports = new CalculatorModel('UK', calculator, {
    nationalInsurance: true,
    rounding: 0
});
