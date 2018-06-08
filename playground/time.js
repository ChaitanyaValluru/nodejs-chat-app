var moment = require('moment');

var date = new Date();
console.log(date.getMonth());

date = moment();
//date.add(1, 'year').subtract(3, 'months');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));
