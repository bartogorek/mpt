const OrderInstance = require('../models/orderinstance'); // links to the mongoose model
const moment = require('moment'); // requires 'moment' middleware used to format date
const dateFunctions = require('../public/javascripts/dateFunctions'); // requires my function that parses date into string
const every = require('every-moment');

// Display all works order tiles in the main view.
exports.orderinstance_list = (req, res) => {
  // testing every-moment module, print at regular intervals, it works!
  //const print = every(1, 'second', function() {
  //  console.log('hey, every second counts');
  //});

  const dateString = dateFunctions.newDate();
  OrderInstance.find({ 'orderDate': dateString }, (err, list_orderinstances) => {
    if (err) { return next(err); } // this might need changing ?? or not
    res.render('index', { title: 'List of orders', orderinstance_list: list_orderinstances, date: dateString });
  });
};

// Display all works orders with production date matching the input field (GET).
exports.orderinstance_list_by_date = (req, res) => {
  const date = dateFunctions.parseUrl(req.query.date_selection);
  OrderInstance.find({ 'orderDate': date }, (err, list_orderinstances) => {
    if (err) { return next(err); } // this might need changing ?? or not
    res.render('index', { title: 'List of orders', orderinstance_list: list_orderinstances, date: date });
  });
};

// Display order instance detail from GET page showing edit options.
exports.orderinstance_detail = (req, res) => {
  OrderInstance.findById(req.params.id)
  .populate('order')
  .exec(function (err, order) {
    if (err) { return next(err); }
    res.render('orderinstance', { title: 'This is order instance detail view', order: order });
  });
};

// Update order instance from POST, updating quantity.
exports.orderinstance_detail_post = (req, res) => {
  OrderInstance.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, OrderInstance) => {
      if (err) return res.status(500).send(err); // this will need looking at, as it's copied straight over from a website, not neccessarily right.
      return res.redirect('/catalog/index');
    });
};

// Delete order instance.
exports.orderinstance_delete = (req, res) => {
  OrderInstance.findByIdAndRemove(req.params.id, (err, orderinstance) => {
    if (err) return res.status(500).send(err);
    const response = {
      message : "Order succesfully deleted",
      id: req.params.id
    };
    return res.redirect('/catalog/admin/view-data');
  });
};

exports.orderinstance_roll = (req, res, next) => {

  OrderInstance.findById(req.params.id)
    .populate('order')
    .exec(function (err, order) {
      if (err) { return next(err); }

      // using moment.js to convert old date into new date (+1 day)
      const oldDate = moment(order.orderDate, 'DD/MM/YYYY').toDate();
      const newDate = moment(oldDate).add(1, 'days').format('DD/MM/YYYY').toString();

      // creating new object that will be used to update document
      // this is working but I had to delete all 'default' values from orderinstance models
      // as it was re-setting all other values to default.
      const orderinstance = new OrderInstance(
        {
          orderDate: newDate,
          _id: req.params.id,
        });

      // finding document by ID and updating it using the new object we created above
      OrderInstance.findByIdAndUpdate(req.params.id, orderinstance, {}, function (err, thebookinstance) {
        if (err) { return next(err); }
        res.redirect('/catalog/orderinstance/'+req.params.id); // re-rendering the view with updated production date
      });
    });
};

// Display all data held in the DB collection.
exports.admin_view_data = (req, res) => {
  OrderInstance.find(function (err, list_orderinstances) {
    if (err) { return next(err); } // this might need changing ?? or not
    res.render('admin-view-data', { title: 'Viewing data', orderinstance_list: list_orderinstances });
  });
};

// Add new works order page.
exports.admin_add_orderinstance = (req, res) => {
  res.render('admin-add-order', { title: 'Add new works order' });
};

// Add new works order form.
exports.orderinstance_create_post = (req, res, next) => {
  const orderinstance = new OrderInstance(
    {
      productCode: req.body.product_code,
      productName: req.body.product_name,
      quantity: req.body.quantity,
      resource: req.body.resource,
      startTime: req.body.start_time,
      endTime: req.body.end_time,
      rollJob: req.body.roll_job,
      dateAttribute: req.body.date_attribute,
      productWeight: req.body.product_weight,
      unitsPerCase: req.body.units_per_case,
      orderDate: req.body.order_date,
      dateCreated: req.body.date_created,
      quantityCompleted: req.body.quantity_completed,
      statusIfHold: req.body.status_if_hold,
      statusIfOpen: req.body.status_if_open,
      statusIfOriginal: req.body.status_if_original,
      area: req.body.area
    });
  // Data from form is valid.
  orderinstance.save(function (err) {
    if (err) { return next(err); }
       // Successful - redirect to defined page.
       res.redirect('/catalog');
    });
};
