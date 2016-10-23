let Calculators = new Map([
    ['UK', UK],
    ['NL', NL],
]);
let inputs;

$(document).ready(function() {

    //$("#edit-rec option:selected").removeAttr("selected");
$('select').material_select();


    inputs = new Vue({
        el: '#inputs',
        data: {
            year_input: '123',
            country: [],
            result: []
        },
        computed: {
            year_input_monthly: function() {
                return Math.round(this.year_input / 12);
            }
        },
        methods: {
            calculate: function() {
                console.log(this.country)
                for (var i in this.country) {
                    let calc = Calculators.get(this.country[i])
                    calc.calculate(this.year_input)
                    this.result.d = JSON.stringify(calc.result);

                }

            }
        }
    })








    function getTaxResults() {
        $("#results").text("");
        $("#country option:selected").each(function(i) {
            let country = $(this).val();
            let usedCalc = Calculators.get(country);
            usedCalc.calculate(yearInput)
            $("#results").append(country + ": " + JSON.stringify(usedCalc.result) + "<br>");
        });


    }



    function bind() {
        $("#year_amount").keyup(function() {
            var yearvalue = $("#year_amount").val()
            console.log(yearvalue)
            $("#month_amount").val(Math.round(yearvalue / 12));
            $("#month_amount_label").addClass("active")
        });
        $("#year_amount").focusout(function() {
            if (!$("#year_amount").val()) {
                console.log("removeclass")
                $("#month_amount_label").removeClass("active")
            }
            if ($("#year_amount").hasClass("valid")) {
                $("#month_amount").addClass("valid");
            } else {
                $("#month_amount").removeClass("valid");
            }
        });

        $("#month_amount").keyup(function() {
            var yearvalue = $("#month_amount").val()
            $("#year_amount").val(Math.round(yearvalue * 12));
            $("#year_amount_label").addClass("active")
        });
        $("#month_amount").focusout(function() {
            if (!$("#month_amount").val()) {
                $("#year_amount_label").removeClass("active")
            }
            if ($("#month_amount").hasClass("valid")) {
                $("#year_amount").addClass("valid");
            } else {
                $("#year_amount").removeClass("valid");
            }
        });

    }

});
