var assert = require('assert');

var calculator = require('../js/calculator/nl-calculator.js');

describe('NL Tax Calculator', function () {

    it('should calculate net year with default values', function () {
        let result = calculator.calculate(50000);
        assert.equal(result.netYear, 34022.23584);
    });

    it('should calculate net year when 30% ruling on', function () {
        let result = calculator.calculate(50000, {ruling30: true, holidayAllowance: false, socialSecurity: true});
        assert.equal(result.netYear, 41405.535840000004);
    });

    it('should calculate net year when holiday allowance on', function () {
        let result = calculator.calculate(50000, {ruling30: false, holidayAllowance: true, socialSecurity: true});
        assert.equal(result.netYear, 32141.569173333326);
    });

    it('should calculate net year when no social security', function () {
        let result = calculator.calculate(50000, {ruling30: false, holidayAllowance: false, socialSecurity: false});
        assert.equal(result.netYear, 43302.281339999994);
    });

    it('should calculate taxable income when 30% ruling on', function () {
        let result = calculator.calculate(50000, {ruling30: true, holidayAllowance: false, socialSecurity: true});
        assert.equal(result.taxableYear, 35000);
    });

    it('should return gross year and month', function () {
        let result = calculator.calculate(50000, {});
        assert.equal(result.grossYear, 50000);
        assert.equal(result.grossMonth, 4166.666666666667);
    });

    it('should convert values when currency GBP', function () {
        let result = calculator.calculate(50000, {ruling30: false, holidayAllowance: false, rounding: 0, socialSecurity: true, currency: 'GBP'});
        assert.equal(result.netYear, 32705);

        result = calculator.calculate(100000, {ruling30: false, holidayAllowance: false, rounding: 0, socialSecurity: true, currency: 'GBP'});
        assert.equal(result.netYear, 55179);
    });

    it('should convert values when currency EUR', function () {
        let result = calculator.calculate(50000, {ruling30: false, holidayAllowance: false, rounding: 0, socialSecurity: true, currency: 'EUR'});
        assert.equal(result.netYear, 34022);

        result = calculator.calculate(100000, {ruling30: false, holidayAllowance: false, rounding: 0, socialSecurity: true, currency: 'EUR'});
        assert.equal(result.netYear, 57134);
    });

});


