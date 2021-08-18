const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const command = process.argv[2];
const note_title = yargs.argv['title'];
const note_content = yargs.argv['body'];
const note_file_name = yargs.argv['file'];

// \

addNote = () => {
	fs.writeFileSync(note_file_name, note_title.toUpperCase());
	fs.appendFileSync(note_file_name, "\n");
	fs.appendFileSync(note_file_name, note_content);
	console.log(chalk.inverse.bold.green(' New note successfully created!!! '));
}

deleteNote = () => {
	console.log('Deleting note...');
}

switch(command){
	case 'add':
		addNote();
		break;
	case 'delete':
		deleteNote();
		break;
	default:
		console.log('default option...');
}
