let Calculators = new Map([
    ['UK', UK],
    ['NL', NL],
]);
let inputs;

$(document).ready(function() {

    //$("#edit-rec option:selected").removeAttr("selected");
    //$('select').material_select();


    inputs = new Vue({
        el: '#calculator',
        data: {
            year_input: '',
            countries: []
        },
        computed: {
            year_input_monthly: function() {
                if (this.year_input.length !== 0) {
                    return Math.round(this.year_input / 12);
                }

            },
            results: function() {
                let tempArray = [];

                if (this.countries.length === 0 || !this.year_input) {
                    return tempArray;
                }

                for (var i in this.countries) {
                    let country = this.countries[i];
                    let usedCalc = Calculators.get(country);
                    usedCalc.calculate(this.year_input)
                    tempArray.push({
                        country: country,
                        grossYear: this.year_input,
                        net_year: Math.round(usedCalc.result.netYear),
                        net_month: usedCalc.result.netMonth
                    })
                    console.log(usedCalc.result)
                }
                return tempArray;
            }
        },

        components: {
            'result-item': {
                props: {
                    country: String,
                    grossYear: Number,
                    netYear: Number,
                    netMonth: Number
                },
                template: '<tr id="target">' +
                    '<td>{{country}}</td>' +
                    '<td>{{grossYear}}</td>' +
                    '<td>{{netYear}}</td>' +
                    '<td v-on:click="open(this)">{{netMonth}}</td>' +
                    '</tr>',
                methods: {
                    open: function(value) {
                        console.log(value)
                    }
                }
            }
        }

    });




});
