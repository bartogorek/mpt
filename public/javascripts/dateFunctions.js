const moment = require('moment'); // requires 'moment' middleware used to format date

// reads today's date and converts to a string so database search can be performed
exports.newDate = () => {
  const date = new Date;
  const dateFormatted = moment(date).format('DD/MM/YYYY');
  const dateString = dateFormatted.toString();
  return dateString;
}

// function parsing url query into string representing DD/MM/YYYY
exports.parseUrl = (url) => {
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
