const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/person');
const logger = require('./interfaces/logger');

const API_URL = '/api/persons';
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(logger);

app.get('/info', (req, res) => {
  Person.find({})
    .then(people => res.send(
      `<section>
  <p>Puhelinluettelossa ${ people.length } henkilön tiedot</p>
  <p>${ new Date() }</p>
</section>`
    ));
});

app.get(API_URL, (req, res, next) => {
  Person.find({})
    .then(people => res.json(
      people.map(person => person.toJSON())
    ))
    .catch(err => next(err));
});

app.get(API_URL + '/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then(person => {
      if(person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post(API_URL, (req, res, next) => {
  const { name, number } = req.body;
  if(!name) {
    return res.status(400).json({
      error: 'no name'
    });
  }
  //TODO: Check if attempting to add existing number/name

  const person = new Person({ name, number });
  person.save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(err => next(err));
});

app.put(API_URL + '/:id', (req, res, next) => {
  const { name, number } = req.body;

  const personData = { name, number };
  const person = new Person({ name, number });
  console.log(person);

  Person.findByIdAndUpdate(
    req.params.id, personData, {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(err => next(err));
});

app.delete(API_URL + '/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if(result) {
        res.status(204).end();
      }
      res.status(404).end();
    })
    .catch(err => next(err));
});


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  console.log('[!]', err.message);

  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Malformed ID' });
  }

  if(err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};


app.listen(PORT, () => {
  console.log('Listening: http://localhost:' + PORT);
});

app.use(unknownEndpoint);
app.use(errorHandler);
