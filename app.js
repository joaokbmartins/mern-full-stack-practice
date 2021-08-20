const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const notes_root = 'notes/';
const note_file_name = notes_root + yargs.argv['file'];

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

listNotes = () => {
	fs.readdirSync(notes_root).forEach(note => console.log(note));
}

readNote = () => {
	const content = fs.readFileSync(note_file_name);
	console.log(content);
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
	})
	.command('list', 'List notes', function() {
		listNotes();
	})
	.command('read', 'Read note content', function() {
		readNote();
	})
.help().argv; 