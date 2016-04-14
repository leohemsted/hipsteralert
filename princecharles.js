let dateFormat = require('dateformat'),
    url = require('url'),
    rp = require('request-promise');

module.exports.getMoviesForDate = date => {
    let options = {
        url: url.format({
            protocol: 'https',
            host: 'www.princecharlescinema.com',
            pathname: 'wp-admin/admin-ajax.php',
            query: {
                action: 'novamedia_get_performances_for_shortcode_calendar',
                date: dateFormat(date, 'yyyy-mm-dd')
            }
        }),
        json: true
    };
    return rp(options);
};
