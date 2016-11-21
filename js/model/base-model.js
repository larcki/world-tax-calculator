module.exports = function(country, instance, settings) {
    return new Vue({
        data: {
            country: country,
            instance: instance,
            settings: settings,
            yearlyAmount: 0,
            isExpanded: false
        },
        computed: {
            breakdown: function () {
                return this.instance.calculate(this.yearlyAmount, this.settings);
            }
        }
    })
};
