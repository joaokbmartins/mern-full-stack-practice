const validator = require('validator');

const batata = require('./utils.js');
const getNotes = require('./notes.js');

console.log('isEmail: ', validator.isEmail('test@batata.com'));
console.log('isUrl: ', validator.isURL('https://google.com'));

console.log(batata(1, 3));
console.log(getNotes());