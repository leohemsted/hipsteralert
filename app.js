var express = require('express'),
    https = require('https');

var app = express();

app.get('/films', (req, res) => {
    let constructPath = (date) => {

    };
    let today = new Date();
    let options = {
        hostname: 'princecharlescinema.com',
        path: constructPath(today)
    };
    https.request(options, (res) => {

    });
    res.send('Hello World!');
});

app.listen(3000);
