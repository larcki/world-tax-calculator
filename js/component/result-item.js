var register = require('../register.js');


module.exports = Vue.component("result-item", {
    template: '<li>' +
    '<div class="collapsible-header row no-margin animated fadeIn"  v-bind:class="{ active: data.isExpanded }">' +
    '<div class="col s3 m3 l3 icon" v-bind:class="styleClass">{{data.country}}</div>' +
    '<div class="col s3">{{data.breakdown.netYear}}</div>' +
    '<div class="col s3">{{data.breakdown.netMonth}}</div>' +
    '<div class="col s3">{{data.breakdown.totalDeductionRate}}</div>' +
    '</div>' +
    '<div class="collapsible-body row no-margin">' +
    '<component v-bind:is="countryComponent"></component>' +
    '</div>' +
    '</li>',
    props: {
        data: Object
    },
    computed: {
        countryComponent: function () {
            setTimeout(this.expand, 500);
            return register.get(this.data.country).component;
        },
        styleClass: function () {
            return this.data.country;
        }
    },
    methods: {
        expand: function () {
            $('.collapsible').collapsible({
                accordion: false
            });
        }
    }
});
