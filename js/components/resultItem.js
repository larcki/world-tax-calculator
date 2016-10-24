Vue.components("result-item", {
    props: {
        country: String,
        grossYear: Number,
        netYear: Number,
        netMonth: Number
    },
    template: '<tr>' +
    '<td v-on:click="shit()">{{country}}<div id="slide" style="height: 40px; background-color: #00695c"></div></td>' +
    '<td>{{grossYear}}</td>' +
    '<td>{{netYear}}</td>' +
    '<td>{{netMonth}}</td>' +
    '</tr>',
    methods: {
        shit: function () {
            console.log("asdijjdsiajai")
        }
    }
})