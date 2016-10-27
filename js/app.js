let commonInput;

function swapem() {

    if ($('#year').hasClass("fadeInUp")) {
        $('#year').addClass("animated fadeInDown")
        $('#month').addClass("animated fadeInUp")
    } else {
        $('#year').addClass("animated fadeInUp")
        $('#month').addClass("animated fadeInDown")
    }
};

$(document).ready(function () {

    commonInput = new Vue({
        el: '#common-input',
        data: {
            year_input: 50000,
            countries: ['NL', 'UK']
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


    $("#month").click(function () {
        $('#disabled').removeAttr('disabled');
        $('#year_amount').prop('disabled', true);
    });

    $('.collapsible').collapsible({
        accordion: false
    });

});

Vue.component("result-item", {
    template: '<li>' +
    '<div class="collapsible-header">' +
    '<div class="col s3">{{data.country}}</div>' +
    '<div class="col s3">{{data.yearlyAmount}}</div>' +
    '<div class="col s3">{{data.summary.net_year}}</div>' +
    '<div class="col s3">{{data.summary.net_month}}</div>' +
    '</div>' +
    '<div class="collapsible-body">' +
    '<component v-bind:is="countryComponent"></component>' +
    '</div>' +
    '</li>',
    props: {
        data: Object
    },
    computed: {
        countryComponent: function () {
            return CountryComponents.get(this.data.country)
        }
    }
});


Vue.component("breakdown-row", {
    template: '<div class="breakdown-row">' +
    '<div class="col s6" >{{title}}</div>' +
    '<div class="col s4 offset-s2" >{{value}}</div>' +
    '</div>',
    props: {
        title: String,
        value: Number
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
                this.calculate(this.yearlyAmount);
                return this.instance.breakdown;
            },
            summary: function () {
                return {
                    country: this.country,
                    grossYear: this.breakdown.grossYear,
                    net_year: Math.round(this.breakdown.netYear),
                    net_month: this.breakdown.netMonth
                }
            }
        },
        methods: {
            calculate: function () {
                this.instance.calculate(this.yearlyAmount, this.settings);
            }
        }
    })
}

let UKCalculator = new Calculator('UK', UK);
let NLCalculator = new Calculator('NL', NL, {
    ruling30: true,
    holidayAllowance: false
});

let NLComponent = Vue.extend({
    template: '<div class="row" style="padding:20px">' +
    '<div class="col s6">' +
        '<breakdown-row title="Taxable Income" :value="breakdown.taxableYear" ></breakdown-row>' +
        '<breakdown-row title="Income Tax" :value="breakdown.incomeTax" ></breakdown-row>' +
        '<breakdown-row title="General Tax Credit" :value="breakdown.generalCredit" ></breakdown-row>' +
        '<breakdown-row title="Labour Tax Credit" :value="breakdown.labourCredit" ></breakdown-row>' +
        '<breakdown-row title="Net Income" :value="breakdown.netYear" ></breakdown-row>' +
    '</div>' +
    '<div class="input-field col s6">' +
    '<div class="row">' +
        '<input type="checkbox" class="filled-in" id="test5" v-model="settings.ruling30"/>' +
        '<label for="test5">30% Ruling</label>' +
    '</div>' +
    '<div class="row">' +
        '<input type="checkbox" class="filled-in" id="test6" v-model="settings.holidayAllowance"/>' +
        '<label for="test6">Holiday Allowance</label>' +
    '</div>' +
    '</div>' +
    '</div>',
    data: function () {
        return NLCalculator;
    }
});


let UKComponent = Vue.extend({
    template: '<p> this is UK specific component </p>',
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


