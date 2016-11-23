require('./component/result-item.js');
require('./component/breakdown-row.js');
var register = require('./register.js');

$(document).ready(function () {

    var vue = new Vue({
        el: '#common-input',
        data: {
            year_input: '',
            countries: []
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
            results: function () {
                let tempArray = [];
                if (this.countries.length === 0 || !this.year_input) {
                    return tempArray;
                }
                for (var i in this.countries) {
                    let country = this.countries[i];
                    var calcInUse = register.get(country).model;
                    calcInUse.yearlyAmount = this.year_input;
                    calcInUse.isExpanded = (this.countries.length <= 1);
                    tempArray.push(calcInUse);
                }
                return tempArray;
            }
        }

    });


    $('select').change(function() {
        var newCountries = $("select option:selected");

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

    $('select').material_select();
    $('.collapsible').collapsible({
        accordion: false
    });

});



