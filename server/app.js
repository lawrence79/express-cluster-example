'use strict';

require('dotenv').config();
const express = require('express');

module.exports = function() {

    const app = express();

    app.set('port', (process.env.PORT || 5000));

    app.use(express.static(__dirname + '/public'));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.listen(app.get('port'), () => {
        console.log(`Node app is running at localhost:${app.get('port')}`);
    });

    return app;
};
