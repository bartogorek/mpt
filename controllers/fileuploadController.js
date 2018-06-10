var OrderInstance = require('../models/orderinstance');
var csv = require('fast-csv');
var mongoose = require('mongoose');

// Display file upload page
exports.fileupload_index = function(req, res) {
  res.render('fileupload', { title: 'File upload page' });
};

// POST - upload csv file
exports.fileupload_post = function(req, res) {
  if (!req.files)
      return res.status(400).send('No files were uploaded.');

  var orderFile = req.files.file;

  var orders = [];

  csv
   .fromString(orderFile.data.toString(), {
       headers: true,
       ignoreEmpty: true
   })
   .on("data", function(data){
       data['_id'] = new mongoose.Types.ObjectId();

       orders.push(data);
   })
   .on("end", function(){
       OrderInstance.create(orders, function(err, documents) {
          if (err) throw err;
       });

       res.send(orders.length + ' orders have been successfully uploaded.');
   });
};
