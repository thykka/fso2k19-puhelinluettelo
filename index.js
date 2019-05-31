const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const API_URL = '/api/persons';

app.use(bodyParser.json());

let persons = [
  {
    id: 0,
    name: 'Test Person',
    number: '000-0000000'
  }
];

// https://jsperf.com/generateid-01/1
const generateId = (items) => 1 + items.reduceRight(
  (max, item) => item.id < max ? max : item.id,
  -1
);

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
  const id = parseInt(req.params.id, 10);
  const person = persons.find(person => person.id === id);

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

  const person = {
    name, number,
    id: generateId(persons)
  };

  persons = [ ...persons, person ];

  res.json(person);
});

app.delete(API_URL + '/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
  console.log(persons);
});

const port = 3001;

app.listen(port, () => {
  console.log('Listening: http://localhost:' + port);
});

