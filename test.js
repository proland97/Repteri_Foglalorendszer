const moment = require('moment');

let a = new Date('2020-08-09')
let b = new Date('2020-08-09')

let c = new Date('2020-08-09')
let d = new Date('2020-08-15')


const createDate = (year, month, day) => {

    let correctDay = ''
    if (day < 10) {
        correctDay = '0' + day;
    } else {
        correctDay = '' + day;
    }

    let correctMonth = ''
    if (month < 10) {
        correctMonth = '0' + month;
    } else {
        correctMonth = '' + month;
    }

    date = new Date(`${year}-${correctMonth}-${correctDay}`)
    return date;
}

const isFree = (date1Start, date1End, date2Start, date2End) => {

    if (date2Start >= date1Start && date2Start <= date1End) {
        return false;
    }
    if (date2End >= date1Start && date2End <= date1End) {
        return false;
    }
    return true;
}


//console.log(new Date().toDateString());

console.log(new Date(Date.now()));
console.log(new Date(Date.now() + 3600000));