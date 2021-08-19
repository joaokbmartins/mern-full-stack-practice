const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const command = process.argv[2];

// \

const note_file_name = 'notes/' + yargs.argv['file'];

addNote = () => {
	const fileExists = fs.existsSync(note_file_name);
	if (fileExists) {
		logDanger('Error: file already exists...');
		return;
	}
	const note_title = yargs.argv['title'];
	const note_content = yargs.argv['body'];
	
	fs.writeFileSync(note_file_name, note_title.toUpperCase());
	fs.appendFileSync(note_file_name, "\n");
	fs.appendFileSync(note_file_name, note_content);
	logSuccess('New note successfully created!!!');
}

deleteNote = () => {
	try {
		logDanger('Deleting note: ' + note_file_name);
		fs.rmSync(note_file_name);
		logSuccess('Note successfully deleted!!!');
	} catch(error) {
		logDanger('Error: ' + error.message);
	}
}

logSuccess = (message) => {
	console.log(chalk.green.bold.inverse(' ' + message + ' '));
}

logDanger = (message) => {
	console.log(chalk.red.bold.inverse(' ' + message + ' '));
}

switch(command){
	case 'add':
		addNote();
		break;
	case 'delete':
		deleteNote();
		break;
	default:
		logDanger('Invalid option. Try agin...');
}
