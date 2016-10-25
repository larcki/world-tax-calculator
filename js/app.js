let inputs;

$(document).ready(function () {

    inputs = new Vue({
        el: '#calculator',
        data: {
            year_input: 30000,
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
    '<div class="collapsible-header">{{data.country}} {{data.yearlyAmount}} {{data.summary.net_year}} {{data.summary.net_month}}</div>' +
    '<div class="collapsible-body" style="background-color: lightcyan">' +
    '<p>Common stuff for all controls</p>' +
    '<component v-bind:is="countryComponent"></component>' +
    '</div>' +
    '</li>',
    props: {
        data: Object
    },
    data: function () {
        return {
            countryComponent: CountryComponents.get(this.data.country)
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



//let UKCalculator = new Vue({
//    data: {
//        country: 'UK',
//        yearlyAmount: 0,
//    },
//    computed: {
//        breakdown: function () {
//            this.calculate(this.yearlyAmount);
//            return UK.breakdown;
//        },
//        summary: function () {
//            return {
//                country: 'UK',
//                grossYear: this.breakdown.grossYear,
//                net_year: Math.round(this.breakdown.netYear),
//                net_month: this.breakdown.netMonth
//            }
//        }
//    },
//    methods: {
//        calculate: function () {
//            UK.calculate(this.yearlyAmount);
//        }
//    }
//});


//let NLCalculator = new Vue({
//    data: {
//        country: 'NL',
//        yearlyAmount: 0,
//        ruling30: true,
//        holidayAllowance: true
//    },
//    computed: {
//        breakdown: function () {
//            this.calculate(this.yearlyAmount);
//            return NL.breakdown;
//        },
//        summary: function () {
//            return {
//                country: 'NL',
//                grossYear: this.breakdown.grossYear,
//                net_year: Math.round(this.breakdown.netYear),
//                net_month: this.breakdown.netMonth
//            }
//        }
//    },
//    methods: {
//        calculate: function () {
//            NL.calculate(this.yearlyAmount, this.holidayAllowance, this.ruling30);
//        }
//    }
//});

let NLComponent = Vue.extend({
    template: '<p> this is NL specific component {{settings.ruling30}} </p>',
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


