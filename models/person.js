const mongoose = require('mongoose');
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
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
