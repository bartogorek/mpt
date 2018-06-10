var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var orderInstanceSchema = new Schema(
  {
    productCode: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true }, // quantity to make
    resource: { type: String, required: true }, // line or machine to be used
    startTime: { type: String, required: true }, // start of the run
    endTime: { type: String, required: true }, // end of the run
    rollJob: { type: String, enum: ['yes', 'no'], required: true }, // can be used to identify jobs rolled from previous day
    dateAttribute: { type: String, required: true }, // not sure, possibly use by date ?
    productWeight: { type: Number, required: true }, // weight of single pack in KGs
    unitsPerCase: { type: Number, required: true }, // number of packs in an outer box
    orderDate: { type: String, required: true }, // production date
    dateCreated: { type: String, required: true }, // date of when the order was created
    quantityCompleted: { type: Number }, // number of cases completed
    statusIfHold: { type: String, enum: ['use', 'hold', 'reject'], required: true }, // 'default' deleted to overcome issue with updating 'roll' value
    statusIfOpen: { type: String, enum: ['open', 'closed'], required: true },
    statusIfOriginal: { type: String, enum: ['original', 'added', 'cancelled'], required: true },
    area: { type: String, enum: ['packing', 'mixing'], required: true }
  }
);

// Virtual property for orderinstance showing volume in kg
orderInstanceSchema
.virtual('volume')
.get(function() {
  var vol = this.productWeight * this.unitsPerCase * this.quantity / 1000;
  return vol;
});

orderInstanceSchema
.virtual('volumeMade')
.get(function() {
  var vol = this.productWeight * this.unitsPerCase * this.quantityCompleted / 1000;
  return vol;
});

orderInstanceSchema
.virtual('prodDate')
.get(function() {
  var date = moment(this.orderDate).format('DD/MM/YYYY');
  return date.toString();
});

//Export model
module.exports = mongoose.model('OrderInstance', orderInstanceSchema);
