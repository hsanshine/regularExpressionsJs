"use strict";
let re1 = new RegExp("abc");
let re2 = /abc/;
// pattern, an a followed by a b followed by a c

let eighteenPlus = /eighteen\+/;

console.log(/abc/.test("abcde"));
console.log(/abc/.test("abxde"));

console.log(/[0123456789]/.test("in 1992")); // retursn true for any of the numbers in the square brackets
console.log(/[0-9]/.test("in 1998"));
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));

console.log(dateTime.test("30-jan-2003 15:20")); // jan is not known, it is [\w]{3}

let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
console.log(notBinary.test("1100100010200110"));

// + means the character may be matched one or more times
console.log(/'\d+'/.test("'123'")); //atleast one number between single quotes
console.log(/'\d+'/.test("''")); // it can match the quotes but not the numbers !!!

console.log(/'\d*'/.test(" '123' ")); // should match as true
console.log(/'\d*'/.test(" '' ")); //should match as true

// question mark matches zero or one times.. may not occur or occur just once
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour")); //should match too
console.log(neighbor.test("neighbor")); //should match too

//braces to indicte a pattern should occur a precise number of times

dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));

let cartoonCrying = /boo+(hoo+)+/i; //i for case insensitive
console.log(cartoonCrying.test("Boohoooohoohooo"));

let match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);
console.log(match.input);
console.log(match[0]);

console.log("one two 100".match(/\d+/)); //string have a match method that works like exec on regexp

let quotedText = /'([^']*)'/; // characters inside that are not single quotes, none or multiple of them
console.log(quotedText.exec("she said 'hello'")); // first element will be the part of the text that matched and the next element will be the part that matches with the groups

console.log(/bad(ly)?/.exec("bad")); // (ly) group does not match, undefined in array obj
console.log(/(\d)+/.exec("123")); // array has the whole string 123 and 3 because it is the last elment in the array that matched with the group given the the regexp

//creating a date object from a string by extracting the portion of it that matches the date patterns
function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day); //months start at zero
}

console.log(getDate("today is 22-07-2021"));

// entirely one or more digits
let onlyDigits = /^\d+$/; // only just digits
let startExcla = /^!/; // starts in !
let noMatch = /x^/; // no matches as it violated the ^ properties..you cant have an X before the start of a string

console.log(/cat/.test("concatenate")); //true
console.log(/bcat/.test("concatenate")); // not cat at the start so false

//text contains a number followed by cow or pig or chicken (s)
let animalCount = /\b\d+ (cow|pig|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("15 pigchickens"));

//a general number , binary, or hexadecimal or decimal
let genNum = /\b([01]+b|[\da-f]+h|\d+)\b/; // we have word boundaries on both sides of the parenthesis

//starts with any characters or an x
let startX = /^.*x/;
console.log("testing with abcxe is: ", startX.test("abcxe"));

//the replace method in strings
console.log("papa".replace("p", "m")); //replace first occurance of 'p' with 'm'

console.log("Borobudur".replace(/[ou]/, "a")); //replace first occurance of o or u with 'a'
console.log("Borobudur".replace(/[ou]/g, "a"));

//refering to matched groups using the replace function
console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(
    /(\w+), (\w+)/,
    "$2 $1"
  )
); // the parts of the string that matched are stored in $1, $2, $3 etc depends on how many matches you would have gotten if you did exec... upto $9

let s = "the cia and fbi";
console.log(s.replace(/\b(cia|fbi)\b/g, (s) => s.toUpperCase()));
// function called on all matches for the global case adn the return value put in place of the match in the string

// minus one function with the replace function
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    //only one item lefts, remove the 's'
    unit = unit.slice(0, unit.length - 1); //lenght was not inclusive before because its index value would be invalid anyway, but now we cut off even one more character
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne)); //we provide the name of the function that will be called on each matched group

//function to delete comments from code
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]* \*\//, "");
}

console.log(stripComments("1 + /* 2 */3"));
console.log(stripComments("x = 10; // ten!"));
console.log(stripComments("1 /* a */+/* b */ 1"));

stripComments = function (code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
};
console.log(stripComments("1 /* a */+/* b */ 1"));

//=======================================================================================
let userName = "harry";
let text = "Harry is a suspicious character, this harry";
let regexp = new RegExp("\\b(" + userName + ")\\b", "gi");
//you can have one or more spaces before the name and after it
console.log(text.replace(regexp, "_$1_"));

//=====================================================================================
let userName1 = "dea+hl[]rd";
let text1 = "This dea+h[]rd guy is super annoying";
let escaped = userName1.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp1 = new RegExp("\\b" + escaped + "\\b", "gi"); // global and being case insensitive a properties of the regular expression
console.log(text1.replace(regexp1, "_$&_"));

//searching for regular expression in strings
console.log("    word".search(/\S/g)); //returns index of first place is finds none space character
console.log("     ".search(/\S/)); //returns negative one because it finds no none space characters

//where to start searching or last index using the exec function
let pattern = /y/g;
pattern.lastIndex = 3; //will start searching at index 3
match = pattern.exec("xyzzy"); //match will be found at index 4 since we started at index 3
console.log(match);
console.log(match.index);
console.log(pattern.lastIndex);

//==================================================================================
let global = /abc/g;
console.log(global.exec("xyz abc")); //will find this match at abc even if it does not start at index position zero which last index is pointing to right now
let sticky = /abc/y;
console.log(sticky.exec("xyz abc")); //cant find the match as it will want it to start at index zero that lastIndex is pointing to

//watchout for using shared regular expression in calls as the value stored in the lastIndex property changes with every call
let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
console.log(digit.exec("not found 1 due to change in lastIndex"));

console.log("Banana".match(/an/g)); //global switch changes how the match function works on strings

//looping through matches
let input = "A stringg with 3 numbers in it... 42 and 88";
let number = /\b\d+\b/g;
while ((match = number.exec(input))) {
  console.log("Found: ", match[0], " at", match.index);
  //index 0 in the returned match array is always the found match
  //match.index property of match is the place in the input where the match was found
}
