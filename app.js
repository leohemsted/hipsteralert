'use strict';
let express = require('express'),
    princeCharles = require('./princecharles'),
    movies = require('./movies');

let app = express();

app.get('/films', (req, res) => {
    // so dumb
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    princeCharles.getMoviesForDate(tomorrow)
        .then(movies.filterFullShowings)
        .then(movies.aggregateShowings)
        // .then(imdb.fetchIMDBRatings)
        .then((movies)=> res.json(movies))
        .catch((err) => {
            console.trace();
            console.log(err);
            res.send(err);
        });
});

app.listen(3000, () => console.log('Listening on port 3000...'));
