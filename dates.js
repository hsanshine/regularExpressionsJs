console.log(new Date()); //date for today
console.log(new Date(2009, 11, 8)); // 11 is december , janaury is zero
console.log(new Date(2009, 11, 9, 12, 59, 59, 999)); // hours, minutes, milliseconds are 0 if not given
console.log(new Date(2013, 11, 19).getTime()); //gett the ms since start of 1970 the date object created by the Date() constructor of the Date class
console.log(new Date(1387378800000));
//current millisecond count
console.log(new Date().getTime());
console.log(Date.now()); // also the current millisecond count
