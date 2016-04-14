let express = require('express'),
    princeCharles = require('./princecharles');

let app = express();

app.get('/films', (req, res) => {
    // so dumb
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    princeCharles.getMoviesForDate(tomorrow)
        .then((movies) => res.json(movies))
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.listen(3000, () => console.log('Listening on port 3000...'));
