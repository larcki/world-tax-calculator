var assert = require('assert');

var calculator = require('../js/calculator/uk-calculator.js');

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

    it('should convert values when currency EUR', function () {
        let result = calculator.calculate(50000, {nationalInsurance: true, rounding: 0, currency: 'EUR'});
        assert.equal(result.netYear, 37738);

        result = calculator.calculate(100000, {nationalInsurance: true, rounding: 0, currency: 'EUR'});
        assert.equal(result.netYear, 66812);
    });

    it('should convert values when currency GBP', function () {
        let result = calculator.calculate(50000, {nationalInsurance: true, rounding: 0, currency: 'GBP'});
        assert.equal(result.netYear, 36468);

        result = calculator.calculate(100000, {nationalInsurance: true, rounding: 0, currency: 'GBP'});
        assert.equal(result.netYear, 65468);
    });

    it('should convert low values correctly', function () {
        let result = calculator.calculate(2000);
        assert.equal(result.netYear, 2000);

        result = calculator.calculate(10000);
        assert.equal(result.netYear, 9767.6944);

        result = calculator.calculate(15000);
        assert.equal(result.netYear, 13367.6944);
    });

});


