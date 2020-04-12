const moment = require('moment');

const isFree = (date1Start, date1End, date2Start, date2End) => {

    if (date2Start >= date1Start && date2Start <= date1End) {
        return false;
    }
    if (date2End >= date1Start && date2End <= date1End) {
        return false;
    }
    return true;
}


convertToValidDate = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

}

/*
let x = new Date(2020, 8, 8);
let a = new Date(2020, 8, 8);
//console.log(x);
convertToValidDate(x);
//console.log(x);
//console.log(x.toDateString());

//console.log(moment().format())

//console.log(moment('2020-07-24').format());

console.log(moment(a).format('ll'));
*/

const arr = []

const a = arr[0];

console.log(a);