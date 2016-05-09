'use strict';

const express = require('express');
const morgan = require('morgan');
const throng = require('throng');
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


let workers = process.env.WEB_CONCURRENCY || 1;
let port = process.env.PORT || 8000;
let lifetime = process.env.IS_TRAVIS ? 10000 : Infinity;
let start = (workerId => {
  app.listen((port), () => {
    if (process.env.IS_TRAVIS == 'true') {
      setTimeout(() => {
        process.exit(0);
      }, 10000);
    }
    console.log(`Worker #${workerId} started running on port ${port} at ${process.env.IP}.`);
    process.on('SIGTERM', () => {
      console.log(`Worker #${workerId} running on port ${port} at ${process.env.IP} exiting now.`);
    });
  });
});
throng({workers, lifetime, grace: 5000, start});

