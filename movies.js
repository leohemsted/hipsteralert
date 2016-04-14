'use strict';
/* global -Promise */

let Promise = require('bluebird'),
    princeCharles = require('./princecharles');
// a few functions for filtering movies - unless otherwise specified,
// movies is an array of dicts with format as follows
// {
//     title: "HIGH-RISE",
//     subtitle: ...,
//     time: "3:30pm",
//     eventDetailURL: ...
//     slug: "15849",
//     url: ...
// },

module.exports.filterFullShowings = movies => Promise.filter(movies, movie => {
    return princeCharles.getSeatAvailability(movie.slug).then(seats => seats > 1);
});

module.exports.aggregateShowings = movies => movies.reduce(
    (acc, item) => {
        if (!(item.title in acc)) {
            acc[item.title] = [];
        }
        acc[item.title].push({
            'time': item.time,
            'slug': item.slug,
        });
        return acc;
    }, {}
);
