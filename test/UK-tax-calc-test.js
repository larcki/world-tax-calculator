var assert = require('assert');
var rewire = require('rewire');

var calculator = rewire('../js/UK-tax-calc.js').UK;

describe('UK Tax Calculator', function () {

    it('should calculate net amount', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.netYear, 36468.0944);

        result = calculator.calculate(100000);
        assert.equal(result.netYear, 65468.0944);
    });

    it('should calculate net year when no national insurance', function () {
        let result = calculator.calculate(50000, {nationalInsurance: false});
        assert.equal(result.netYear, 40800);
    });

    it('should calculate personal allowance', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.personalAllowance, 11000);
    });

    it('should calculate national insurance', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.nationalInsurance, 4331.9056);
    });

    it('should calculate income tax', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.incomeTax, 9200);
    });

    it('should return gross year and month', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.grossYear, 50000);
        assert.equal(result.grossMonth, 4166.666666666667);
    });

    it('should decrease personal allowance when gross year greater than 100000', function () {
        let result = calculator.calculate(100050);
        assert.equal(result.personalAllowance, 10975);

        result = calculator.calculate(110500);
        assert.equal(result.personalAllowance, 5750);

        result = calculator.calculate(120000);
        assert.equal(result.personalAllowance, 1000);

        result = calculator.calculate(122000);
        assert.equal(result.personalAllowance, 0);
    });

    it('should not let personal allowance become negative', function () {
        let result = calculator.calculate(130000);
        assert.equal(result.personalAllowance, 0);
    });

    it('should use rounding when specified', function () {
        let result = calculator.calculate(50000, {nationalInsurance: true, rounding: 2});
        assert.equal(result.netYear, 36468.09);
    });

});


