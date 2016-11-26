let calculatorModel = require("../model/uk-model.js");


module.exports = Vue.extend({
    template: '<div class="row" style="padding:20px">' +
    '<div class="col s12 m8 l5">' +
    '<breakdown-row title="Gross per Year" :value="breakdown.grossYear"></breakdown-row>' +
    '<breakdown-row title="Taxable Income" :value="breakdown.taxableYear"></breakdown-row>' +
    '<breakdown-row title="Personal Allowance" :value="breakdown.personalAllowance" ></breakdown-row>' +
    '<breakdown-row title="Income Tax" :value="breakdown.incomeTax" ></breakdown-row>' +
    '<breakdown-row title="National Insurance" :value="breakdown.nationalInsurance" ></breakdown-row>' +
    '<breakdown-row title="Total Tax %" :value="breakdown.totalDeductionRate" ></breakdown-row>' +
    '<breakdown-row class="border-top" v-if="!selectedCurrencyEqualsCalculatorCurrency" title="Net per Year (GBP)" :value="breakdown.netYearHomeCurrency" ></breakdown-row>' +
    '<breakdown-row class="bold" title="Net per Year" :value="breakdown.netYear" ></breakdown-row>' +
    '</div>' +
    '<div class="input-field col s12 m4 l6 offset-l1">' +
    '<div class="row">' +
    '<input type="checkbox" class="filled-in" id="uk-ni" v-model="settings.nationalInsurance"/>' +
    '<label for="uk-ni">National Insurance</label>' +
    '</div>' +
    '</div>' +
    '</div>',
    data: function () {
        return calculatorModel;
    }
});
