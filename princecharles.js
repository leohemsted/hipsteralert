'use strict';

let dateFormat = require('dateformat'),
    cheerio = require('cheerio'),
    url = require('url'),
    rp = require('request-promise');

module.exports.getMoviesForDate = date =>
    rp({
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
    });

module.exports.getSeatAvailability = slug =>
    rp({
        url: url.format({
            protocol: 'https',
            host: 'www.jack-roe.co.uk',
            pathname: 'websales/sales/prilon/book',
            query: {perfcode: slug}
        })
    }).then(data => {
        let $ = cheerio.load(data),
            seatsRegex = /Available Seats :\s+(\d+)/;
        let perfDetails = $('.performance-description').text();
        return +seatsRegex.exec(perfDetails)[1];
    });
