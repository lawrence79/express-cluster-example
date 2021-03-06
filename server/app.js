'use strict';

const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(morgan(process.env.LOG_LEVEL || 'dev'));


var controller = require('./controllers/api'); // API controller

var routes = express.Router();
routes.route('/').get(controller.api);

//  prefix
app.use('/api', routes);


// catch 404 status code
app.get('*', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify({ message: 'Not Found' }, 2, 2));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(app.get('port'), function () {
    console.log('Express server listening on %d, in %s mode', app.get('port'), app.get('env'));
});

