const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const EnvInterface = require('../interfaces/env');



const env = new EnvInterface();
const dbUrl = `mongodb+srv://${ env.user }:${ env.pass }@thykka-fso2k19-cswvc.mongodb.net/people?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, { useNewUrlParser: true });

const Log = (...args) => {
  console.log('[M]', ...args);
};

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => Log`connected`)
  .catch(err => Log`couldn't connect; ${ err.message }`);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 7, // https://fi.wikipedia.org/wiki/Matkapuhelinnumerot_Suomessa#Numeron_muoto
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
