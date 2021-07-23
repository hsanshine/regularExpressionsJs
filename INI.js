let iniFile = ` 
    searchengine=https://duckduckgo.com/?q=$1
    spitefulness=9.7

    ; comments are preceded by a semi colon 
    ; each section concerns an individual enemy
    [larry]
    fullname=Larry Doe 
    type=kindergarten bully 
    website=http://www.geocities.com/CapeCanaveral/11451

    [davaeorn]
    fullname=Davaeorn
    type=evil wizard
    outputdir=/home/marijn/enemies/davaeorn`;

/*
  explaining algorithm
  at first we must add to level domain settings to the result object
  the section we are adding these objects to is the result object itself,
       so section = result object -> now add properties and their values
  then when we find a section heading -> now we add this as a property in the result object and immediately assign an empty object to it
  this property in the result object becomes the section object we are saving our settings in
  we starting adding our other setting to the section that corresponds to the section heading
*/
function parseINI(string) {
  //start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match;
    if ((match = line.match(/^(\w+)=(.*)$/))) {
      section[match[1]] = match[2];
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
//{name: "Vasilis", address: {city: "Tessaloniki"}}

//none english characters with regular expressions
console.log(/🍎{3}/.test("🍎🍎🍎"));
console.log(/<.>/.test("<🌹>"));
console.log(/<.>/u.test("<🌹>")); //u for unicode to correct the wrong reliance on code units

//testing properites of characters using the \p for unicode switch on
console.log(/\p{Script=Greek}/u.test("α"));
console.log(/\p{Script=Arabic}/u.test("α"));
console.log(/\p{Alphabetic}/u.test("α")); //not including the property name is can be used for checking if a  value is an alphabet.. the property is assumed to be  a binding to a boolean that returns true or false
console.log(/\p{Alphabetic}/u.test("!"));
