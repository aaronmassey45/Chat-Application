const moment = require('moment');

let date = moment(1234);
date.add(1, 'year');
console.log(date.format('h:mm a'));
