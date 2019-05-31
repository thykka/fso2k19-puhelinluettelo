const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const API_URL = '/api/persons';

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

const logger = morgan(function(tokens, req, res) {
  console.log(Object.keys(req.body));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
  ].join(' ');
});

app.use(logger);

const requestLogger = (req, res, next) => {
  const { method, path, body } = req;
  console.log({
    method, path, body
  });
  next();
};

// app.use(requestLogger);

let persons = [
  {
    id: 0,
    name: 'Test Person',
    number: '000-0000000'
  }
];

// https://jsperf.com/generateid-01/1
const generateId = (items) => {
  let id = '';
  do {
    if(id !== '') console.log('ID Collision: ' + id);
    id = Math.random().toString(32).slice(-8);
  } while(items.find(item => item.id === id));
  return '' + id;
};

app.get('/info', (req, res) => {
  res.send(`<section>
  <p>Puhelinluettelossa ${ persons.length } henkilön tiedot</p>
  <p>${ new Date() }</p>
</section>`);
});

app.get(API_URL, (req, res) => {
  res.json(persons);
});

app.get(API_URL + '/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id == id);

  if(!person) {
    res.status(404).end();
    return;
  }
  res.json(person);
});

app.post(API_URL, (req, res) => {
  const { name, number } = req.body;
  if(!name) {
    return res.status(400).json({
      error: 'no name'
    });
  }
  if(persons.find(person => person.name === name)) {
    return res.status(400).json({
      error: 'person already exists'
    });
  }

  const person = {
    name, number,
    id: generateId(persons)
  };

  persons = [ ...persons, person ];

  res.json(person);
});

app.delete(API_URL + '/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id != id);

  res.status(204).end();
  console.log(persons);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Listening: http://localhost:' + PORT);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
