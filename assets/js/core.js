function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var core = {
    getRegionOptions: function (callback) {
        return $.get('/regions.php', function (data) {
            var html = '';
            for (var index = 0; index < data.length; ++index) {
                html += '<option value="' + data[index].id + '">' + data[index].title + '</option>';
            }
            callback(html);
        }, 'json');
    },
    additionalCode: function () {
        var lead = getParameterByName('lead'),
            hash = getParameterByName('hash');
        return $.get('/additional-code.php', {lead_id: lead, prefix: hash});
    },
    hit: function (prefix) {
        return $.get('/hit.js', {'prefix': prefix || get_prefix()});
    },
    target: function (prefix) {
        return $.get('/target.js', {'prefix': prefix || get_prefix()});
    },
    init: function () {
        document.cookie = 'search_query=' + get_search_param();
    }
};
