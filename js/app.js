let commonInput;

$(document).ready(function () {

    commonInput = new Vue({
        el: '#common-input',
        data: {
            year_input: 50000,
            countries: ['NL']
        },
        computed: {
            year_input_monthly: function () {
                if (this.year_input.length !== 0) {
                    return Math.round(this.year_input / 12);
                }
            },
            results: function () {
                let tempArray = [];
                if (this.countries.length === 0 || !this.year_input) {
                    return tempArray;
                }
                for (var i in this.countries) {
                    let country = this.countries[i];
                    var calcInUse = Calculators.get(country);
                    calcInUse.yearlyAmount = this.year_input;
                    tempArray.push(calcInUse);
                }
                return tempArray;
            }
        }

    });

    $('.collapsible').collapsible({
        accordion: false
    });

});

Vue.component("result-item", {
    template: '<li>' +
    '<div class="collapsible-header row">' +
    '<div class="col s3 m3 l3" v-bind:class="styleClass">{{data.country}}</div>' +
    '<div class="col s3">{{data.yearlyAmount}}</div>' +
    '<div class="col s3">{{data.breakdown.netYear}}</div>' +
    '<div class="col s3">{{data.breakdown.netMonth}}</div>' +
    '</div>' +
    '<div class="collapsible-body row">' +
    '<component v-bind:is="countryComponent"></component>' +
    '</div>' +
    '</li>',
    props: {
        data: Object
    },
    computed: {
        countryComponent: function () {
            return CountryComponents.get(this.data.country)
        },
        styleClass: function () {
            return "icon-" + this.data.country;
        }
    }
});


Vue.component("breakdown-row", {
    template: '<div class="breakdown-row">' +
    '<div class="col s8 m6 l6" >{{title}}</div>' +
    '<div class="col s4 m4 l6" style="text-align: right" >{{value}}</div>' +
    '</div>',
    props: {
        title: String,
        value: String
    }
});

function Calculator(country, instance, settings) {
    return new Vue({
        data: {
            country: country,
            instance: instance,
            settings: settings,
            yearlyAmount: 0
        },
        computed: {
            breakdown: function () {
                return this.instance.calculate(this.yearlyAmount, this.settings);
            }
        }
    })
}

let UKCalculator = new Calculator('UK', UK, {
    nationalInsurance: true,
    rounding: 0
});
let NLCalculator = new Calculator('NL', NL, {
    ruling30: true,
    holidayAllowance: false,
    socialSecurity: true,
    rounding: 0
});

let NLComponent = Vue.extend({
    template: '<div class="row" style="padding:20px">' +
    '<div class="col s12 m8 l5">' +
    '<breakdown-row title="Taxable Income" :value="breakdown.taxableYear" ></breakdown-row>' +
    '<breakdown-row title="Income Tax" :value="breakdown.incomeTax" ></breakdown-row>' +
    '<breakdown-row title="General Tax Credit" :value="breakdown.generalCredit" ></breakdown-row>' +
    '<breakdown-row title="Labour Tax Credit" :value="breakdown.labourCredit" ></breakdown-row>' +
    '<breakdown-row title="Net Income" :value="breakdown.netYear" ></breakdown-row>' +
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
        return NLCalculator;
    }
});


let UKComponent = Vue.extend({
    template: '<div class="row" style="padding:20px">' +
    '<div class="col s12 m8 l5">' +
    '<breakdown-row title="Taxable Income" :value="breakdown.taxableYear"></breakdown-row>' +
    '<breakdown-row title="Income Tax" :value="breakdown.incomeTax" ></breakdown-row>' +
    '<breakdown-row title="Personal Allowance" :value="breakdown.personalAllowance" ></breakdown-row>' +
    '<breakdown-row title="National Insurance" :value="breakdown.nationalInsurance" ></breakdown-row>' +
    '<breakdown-row title="Net Income" :value="breakdown.netYear" ></breakdown-row>' +
    '</div>' +
    '<div class="input-field col s12 m4 l6 offset-l1">' +
    '<div class="row">' +
    '<input type="checkbox" class="filled-in" id="uk-ni" v-model="settings.nationalInsurance"/>' +
    '<label for="uk-ni">National Insurance</label>' +
    '</div>' +
    '</div>' +
    '</div>',
    data: function () {
        return UKCalculator;
    }
});

let Calculators = new Map([
    ['NL', NLCalculator],
    ['UK', UKCalculator],
]);

let CountryComponents = new Map([
    ['UK', UKComponent],
    ['NL', NLComponent]
]);


