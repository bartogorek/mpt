//var OrderInstance = require('../models/orderinstance');

// Display list of all BookInstances.
exports.help_index = function(req, res) {
  res.render('help', { title: 'Help' });
};
