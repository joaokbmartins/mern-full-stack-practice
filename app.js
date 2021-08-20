const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const note_file_name = 'notes/' + yargs.argv['file'];

logSuccess = (message) => {
	console.log(chalk.green.bold.inverse(' ' + message + ' '));
}

logDanger = (message) => {
	console.log(chalk.red.bold.inverse(' ' + message + ' '));
}

deleteFunction = () => {
	try {
		logDanger('Deleting note: ' + note_file_name);
		fs.rmSync(note_file_name);
		logSuccess('Note successfully deleted!!!');
	} catch(error) {
		logDanger('Error: ' + error.message);
	}
}

addNote = () => {
	const note_title = yargs.argv['title'];
	const note_content = yargs.argv['body'];
	fs.writeFileSync(note_file_name, note_title.toUpperCase());
	fs.appendFileSync(note_file_name, "\n");
	fs.appendFileSync(note_file_name, note_content);
	logSuccess('New note successfully created!!!');
}

yargs
	.command('delete', 'Delete a note.', function() { 
		deleteFunction();
	})
	.command('add', 'Create a note.', function() {
		const fileExists = fs.existsSync(note_file_name);
		if (fileExists) {
			logDanger('Error: file already exists...');
			return;
		}
		addNote();
	}
).help().argv; 