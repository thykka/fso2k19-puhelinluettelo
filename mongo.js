// mongoDB.net credentials are loaded from environment variables; DB_USER, DB_PASS

// See https://github.com/motdotla/dotenv if you want to permanently store these on your system.
// $ npm install dotenv

// If using dotenv, check if creds are loaded by uncommenting:
// console.log(require('dotenv').config());

const mongoose = require('mongoose');

let dbUser, dbPass;

console.log(process.argv.length);

if(process.argv.length <= 2) {
  console.log('Attempting login with environment credentials');
  dbUser = process.env.DB_USER;
  dbPass = process.env.DB_PASS;
  console.log(dbUser);
} else {
  dbUser = process.argv[2];
  dbPass = process.argv[3];
}

if(!dbUser || !dbPass) {
  console.log('Missing login credentials. Add <dbUser> <dbPass> as arguments.');
  process.exit(1);
}

const dbUrl = `mongodb+srv://${ dbUser }:${ dbPass }@thykka-fso2k19-cswvc.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

function listPersons() {
  return Person.find({}).then(persons => {
    console.log(persons);
    console.log(
      `phonebook:
      ${ persons.map(person => person.name + ' ' + person.number).join('\n') }`
    );
    mongoose.connection.close();
  });
}

// This is for testing, we wanna keep it, but not call it.
// eslint-disable-next-line no-unused-vars
function newPerson() {
  const person = new Person({
    name: 'Kamehameha',
    number: '1'
  });

  return person.save().then(() => {
    console.log('Person saved;', person);
    mongoose.connection.close();
  });
}

listPersons();
