module.exports = Vue.component("breakdown-row", {
    template: '<div class="breakdown-row">' +
    '<div class="col s8 m6 l6" >{{title}}</div>' +
    '<div class="col s4 m4 l6" style="text-align: right" >{{value}}</div>' +
    '</div>',
    props: {
        title: String,
        value: String
    }
});
