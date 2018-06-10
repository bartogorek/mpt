var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    customer: { type: String, required: true },
    productName: { type: String, required: true, min: 3, max: 100 },
    productCode: { type: Number, required: true },
    productWeight: { type: Number, required: true },
    unitsPerCase: { type: Number, required: true }
  }
);

//Export model
module.exports = mongoose.model('Order', orderSchema);
