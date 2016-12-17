module.exports = (function () {

    var getParameterArrayByName = function (name) {
        var value = getParameterByName(name);
        if (!value) {
            return [];
        }
        return value.split(',').map(function (value) {
            return value.toUpperCase()
        });
    };

    var getParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return '';
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    return {
        parameterArray: getParameterArrayByName,
        parameter: getParameterByName
    }

})();
