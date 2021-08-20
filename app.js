const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');
const { string } = require('yargs');

const notes_root = 'notes/';
const note_file_name = notes_root + yargs.argv['file'];

logSuccess = (message) => {
  console.log(chalk.green.bold.inverse(' ' + message + ' '));
};

logDanger = (message) => {
  console.log(chalk.red.bold.inverse(' ' + message + ' '));
};

deleteFunction = (file) => {
  file = notes_root + file;
  try {
    logDanger('Deleting note: ' + file);
    fs.rmSync(file);
    logSuccess('Note successfully deleted!!!');
  } catch (error) {
    logDanger('Error: ' + error.message);
  }
};

addNote = (argv) => {
  const file = notes_root + argv.file;
  fs.writeFileSync(file, argv.title.toUpperCase());
  fs.appendFileSync(file, '\n');
  fs.appendFileSync(file, argv.body);
  logSuccess('New note successfully created!!!');
};

listNotes = () => {
  fs.readdirSync(notes_root).forEach((note) => console.log(note));
};

readNote = (file) => {
  try {
    const content = fs.readFileSync(notes_root + file, 'utf8');
    console.log(content);
  } catch (error) {
    logDanger(error.message);
  }
};

yargs.command(
  'delete',
  'Delete a note.',
  (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        describe: 'Delete a note',
      })
      .demandOption(['file']);
  },
  (argv) => {
    deleteFunction(argv.file);
  }
);

yargs.command(
  'add',
  'Create a note.',
  (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        describe: 'File name.',
      })
      .option('title', {
        alias: 't',
        type: 'string',
        describe: 'Note title.',
      })
      .option('body', {
        alias: 'b',
        type: 'string',
        describe: 'Note body content.',
      })
      .demandOption(['file', 'body', 'title']);
  },
  (argv) => {
    const fileExists = fs.existsSync(notes_root + argv.file);
    if (fileExists) {
      logDanger('Error: file already exists...');
      return;
    }
    addNote(argv);
  }
);

yargs.command('list', 'List notes', () => {
  listNotes();
});

yargs.command(
  'read',
  'Read note content',
  (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        describe: 'File name.',
      })
      .demandOption(['file']);
  },
  (argv) => {
    readNote(argv.file);
  }
);

yargs.parse();
