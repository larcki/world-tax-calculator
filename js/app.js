let Calculators = new Map([
    ['UK', UK],
    ['NL', NL],
]);
let inputs;

var eventBus = new Vue()

$(document).ready(function () {

    //$("#edit-rec option:selected").removeAttr("selected");
    //$('select').material_select();

    eventBus.$on('30-ruling', function (value) {
        inputs.ruling = value; 
    })

    inputs = new Vue({
        el: '#calculator',
        data: {
            year_input: 30000,
            countries: ['NL'],
            ruling: true
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
                    let usedCalc = Calculators.get(country);
                    usedCalc.calculate(this.year_input, true, this.ruling)
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

        //components: {
        //    'result-item': {
        //        props: {
        //            country: String,
        //            grossYear: Number,
        //            netYear: Number,
        //            netMonth: Number
        //        },
        //        template: '<li>' +
        //        '<div class="collapsible-header">' +
        //        '<td>{{country}}</td>' +
        //        '<td>{{grossYear}}</td>' +
        //        '<td>{{netYear}}</td>' +
        //        '<td>{{netMonth}}</td>' +
        //        '</div>' +
        //        '<div class="collapsible-body" style="background-color: #cfd8dc"><p>{{country}} specific options</p></div>' +
        //        '</li>',
        //        methods: {
        //            open: function (value) {
        //                console.log(value)
        //            }
        //        }
        //    }
        //}


    });

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

});

Vue.component("result-item", {
    props: {
        country: String,
        grossYear: Number,
        netYear: Number,
        netMonth: Number
    },
    template: '<li>' +
    '<div class="collapsible-header">' +
    '<td>{{country}}</td>' +
    '<td>{{grossYear}}</td>' +
    '<td>{{netYear}}</td>' +
    '<td>{{netMonth}}</td>' +
    '</div>' +
    '<item-options :typex="country" ></item-options>' +
    '</li>',
    methods: {
        open: function (value) {
            console.log(value)
        }
    }
});


Vue.component("item-options", {
    props: {
        typex: String,
        is30Ruling: Boolean,
        isHolidayAllowance: Boolean
    },
    data: function() {
        return {
            is30RulingData: this.is30Ruling
        }
    },
    template: '<div class="collapsible-body" style="background-color: #cfd8dc">' +
    '<p>{{typex}} specific options</p>' +
    '<p> <input v-model="is30RulingData" v-on:change="change" type="checkbox" id="test5" /> <label for="test5">30% Ruling</label> </p>' +
    '</div>',
    methods: {
        change: function () {
            console.log("ruling changed!!")
            eventBus.$emit('30-ruling', this.is30RulingData);
        }
    }
});
