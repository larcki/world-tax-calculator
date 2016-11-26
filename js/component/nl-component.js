let calculatorModel = require("../model/nl-model.js");

module.exports = Vue.extend({
    template: '<div class="row" style="padding:20px">' +
    '<div class="col s12 m8 l5">' +
    '<breakdown-row title="Gross per Year" :value="breakdown.grossYear"></breakdown-row>' +
    '<breakdown-row title="Taxable Income" :value="breakdown.taxableYear" ></breakdown-row>' +
    '<breakdown-row title="General Tax Credit" :value="breakdown.generalCredit" ></breakdown-row>' +
    '<breakdown-row title="Labour Tax Credit" :value="breakdown.labourCredit" ></breakdown-row>' +
    '<breakdown-row title="Income Tax" :value="breakdown.incomeTax" ></breakdown-row>' +
    '<breakdown-row class="border-bottom" title="Total Tax %" :value="breakdown.totalDeductionRate" ></breakdown-row>' +
    '<breakdown-row v-if="!selectedCurrencyEqualsCalculatorCurrency" title="Net per Year (EUR)" :value="breakdown.netYearHomeCurrency" ></breakdown-row>' +
    '<breakdown-row class="bold" title="Net per Year" :value="breakdown.netYear" ></breakdown-row>' +
    '</div>' +
    '<div class="input-field col s12 m4 l6 offset-l1">' +
    '<div class="row">' +
    '<input type="checkbox" class="filled-in" id="test5" v-model="settings.ruling30"/>' +
    '<label for="test5">30% Ruling</label>' +
    '</div>' +
    '<div class="row">' +
    '<input type="checkbox" class="filled-in" id="nl-allow" v-model="settings.holidayAllowance"/>' +
    '<label for="nl-allow">Holiday Allowance</label>' +
    '</div>' +
    '<div class="row">' +
    '<input type="checkbox" class="filled-in" id="nl-ni" v-model="settings.socialSecurity"/>' +
    '<label for="nl-ni">Social Security</label>' +
    '</div>' +
    '</div>' +
    '</div>',
    data: function () {
        return calculatorModel;
    }
});
