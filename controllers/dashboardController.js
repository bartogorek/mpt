var OrderInstance = require('../models/orderinstance');
var moment = require('moment');

// functions; might be good idea to combine into one function and return multiple results
function allQty(array) {
  var sum = 0;
  for (i = 0; i < array.length; i++) {
    sum = sum + array[i].quantity;
  }
  return sum;
}
function madeQty(array) {
  var sum = 0;
  for (i = 0; i < array.length; i++) {
    sum = sum + array[i].quantityCompleted;
  }
  return sum;
}
function allVol(array) {
  var sum = 0;
  for (i = 0; i < array.length; i++) {
    sum = sum + array[i].volume;
  }
  return sum;
}
function madeVol(array) {
  var sum = 0;
  for (i = 0; i < array.length; i++) {
    sum = sum + array[i].volumeMade;
  }
  return sum;
}

// GET Display dashboard overview, today's date by default.
exports.dashboard_index = function(req, res) {
  var date = new Date;
  var dateFormatted = moment(date).format('DD/MM/YYYY');
  var dateString = dateFormatted.toString();

  OrderInstance.find({ 'orderDate': dateString }, function (err, list_orderinstances) {
    if (err) { return next(err); } // this might need changing ?? or not
    var n = list_orderinstances.length; // just a test, remove later
    var startQty = allQty(list_orderinstances); // adds quantity of all orders
    var compQty = madeQty(list_orderinstances); // adds quantity completed
    var startVol = allVol(list_orderinstances); // adds total required volume of all orders
    var compVol = madeVol(list_orderinstances); // adds total volume already made of all orders
    res.render('dashboard', { title: 'Dashboard', orderinstance_list: list_orderinstances, n: n, date: dateString,
    startQty: startQty, compQty: compQty, startVol: startVol, compVol: compVol });
  });
};

// GET Display dashboard overview, date as selected via input field.
exports.dashboard_date_selection = function(req, res) {
  var dateurl = req.query.date_selection;
  function parseUrl(url) { // funtction parsing url query into string : DD/MM/YYYY, will need moving to separate file so we can reuse.
    var arr = new Array;
    arr = url.split("");
    var i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] == '%') {
        arr.splice(i, 3);
        arr.splice(i, 1, "/");
      };
      return arr.join("");
    }
  }
  var date = parseUrl(dateurl);

  OrderInstance.find({ 'orderDate': date }, function (err, list_orderinstances) {
    if (err) { return next(err); } // this might need changing ?? or not
    var n = list_orderinstances.length; // just a test, remove later
    var startQty = allQty(list_orderinstances); // adds quantity of all orders
    var compQty = madeQty(list_orderinstances); // adds quantity completed
    var startVol = allVol(list_orderinstances); // adds total required volume of all orders
    var compVol = madeVol(list_orderinstances); // adds total volume already made of all orders
    res.render('dashboard', { title: 'Dashboard', orderinstance_list: list_orderinstances, n: n, date: date,
    startQty: startQty, compQty: compQty, startVol: startVol, compVol: compVol });
  });

};
