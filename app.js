const validator = require('validator');
const chalk = require('chalk');
const batata = require('./utils.js');
const getNotes = require('./notes.js');

console.log('isEmail: ', validator.isEmail('test@batata.com'));
console.log('isUrl: ', validator.isURL('https://google.com'));

console.log(chalk.green('Access Granted'));
console.log(chalk.bgYellow.red.bold('Access Denied'));

console.log(batata(1, 3));
console.log(getNotes());

console.log(process.argv[2]);