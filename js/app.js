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


    $("#month").click(function() {
        $('#disabled').removeAttr('disabled');
        $('#year_amount').prop('disabled', true);
    });

    $('.collapsible').collapsible({
        accordion: false
    });

});

Vue.component("salary-input", {
    template: '<div><div class="row"> ' +
    '<div class="col s4"> <a onclick="swapem()" class="waves-effect red lighten-2 btn">Per month?</a> </div> </div> ' +
    '<div id="year" class="row ani"> <div class="input-field col s12 m6 l6"> ' +
        '<input v-model="year_input" id="year_amount" type="number" class="validate" step=1000> ' +
        '<label id=year_amount_label for="year_amount">Per year</label> ' +
    '</div> </div> ' +
    '<div id="month" class="row ani"> <div class="input-field col s12 m6 l6"> ' +
        '<input disabled v-model="year_input_monthly" id="disabled" type="text" class="validate"> ' +
        '<label for="disabled">Per Month</label> ' +
    '</div> </div></div>',
    props: {
        data: Object
    },
    computed: {
        countryComponent: function () {
            return CountryComponents.get(this.data.country)
        }
    }
});

Vue.component("result-item", {
    template: '<li>' +
    '<div class="collapsible-header">{{data.country}} {{data.yearlyAmount}} {{data.summary.net_year}} {{data.summary.net_month}}</div>' +
    '<div class="collapsible-body">' +
    '<p>Common stuff for all controls</p>' +
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
    holidayAllowance: true
});

let NLComponent = Vue.extend({
    template: '<div><input type="checkbox" id="test5" v-model="settings.ruling30"/> <label for="test5">30% Ruling</label></div>',
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


