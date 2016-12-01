require('./component/result-item.js');
require('./component/breakdown-row.js');
var register = require('./register.js');

const inputTypeTexts = new Map([
    ['YEAR', 'Use Annual Income?'],
    ['MONTH', 'Use Monthly Income?']
]);

const currencyCodes = new Map([
    ['GBP', '\u00A3'],
    ['EUR', '\u20AC']
]);

$(document).ready(function () {

    var vue = new Vue({
        el: '#common-input',
        data: {
            year_input: '',
            countries: [],
            currency: '',
            allowCalculation: false,
            useYear: true,
            inputTypeText: inputTypeTexts.get('MONTH')
        },
        methods: {
            calculate: function() {
                if (this.year_input > 0 && this.countries.length > 0) {
                    this.allowCalculation= true;
                }
            },
            toggleInputType: function() {
                if (this.useYear) {
                    this.useYear = false;
                    this.inputTypeText = inputTypeTexts.get('YEAR')
                } else {
                    this.useYear = true;
                    this.inputTypeText = inputTypeTexts.get('MONTH')
                }
            }
        },
        computed: {
            year_input_monthly: {
                get: function () {
                    $("#month_amount_label").addClass('active');
                    if (this.year_input.length !== 0) {
                        return Math.round(this.year_input / 12);
                    }
                },
                set: function (newValue) {
                    $("#year_amount_label").addClass('active');
                    this.year_input = Math.round(newValue * 12);
                }
            },
            displayCurrency : function() {
                return currencyCodes.get(this.currency);
            },
            results: function () {
                let tempArray = [];
                if (!this.allowCalculation) {
                    return tempArray;
                }
                if (this.countries.length === 0 || !this.year_input) {
                    this.allowCalculation = false;
                    return tempArray;
                }
                for (var i in this.countries) {
                    let country = this.countries[i];
                    var calcInUse = register.get(country).model;
                    calcInUse.yearlyAmount = this.year_input;
                    calcInUse.isExpanded = (this.countries.length <= 1);
                    calcInUse.settings.currency = this.currency;
                    tempArray.push(calcInUse);
                }
                return tempArray;
            }
        }

    });

    setCurrency('GBP')

    $('#country-select').change(function() {
        var newCountries = $("#country-select option:selected");

        newCountries.each(function() {
            if (!vue.countries.includes(this.value)) {
                vue.countries.push(this.value)
            }
        });

        for (var i in vue.countries) {
            var country = vue.countries[i];
            if (!includes(country, newCountries)) {
                vue.countries.splice(i, 1)
            }
        }

        function includes(country, list) {
            for (var i = 0; i < list.length; i++) {
                if (list.get(i).value === country) {
                    return true;
                }
            }
            return false;
        }

    });

    $(".dropdown-button").dropdown();
    $('select').material_select();
    $('.collapsible').collapsible({
        accordion: false
    });
    $('.currency-value').click(function() {
        for (let [key, value] of currencyCodes) {
            console.log("key" + key + ", value " + value);
            if (value === this.text) {
                setCurrency(key);
            }
        }
    });

    function setCurrency(currency) {
        vue.currency = currency;
        $('#currency-button').contents().first()[0].textContent = currencyCodes.get(currency);
    }

});



