Vue.components("result-item", {
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
    '<div class="collapsible-body" style="background-color: #cfd8dc"><p>{{country}} specific options</p></div>' +
    '</li>',
    methods: {
        open: function (value) {
            console.log(value)
        }
    }
})