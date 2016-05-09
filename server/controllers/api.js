/**
 * Main application routes
 */

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

/* instantiate your models here

*/

// GET /api
exports.api = function(req, res) {
    res.json({ message: 'api-demo' + ' v' + (require('../package').version)});
};

