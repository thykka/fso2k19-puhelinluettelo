const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
  {
    id: 0,
    name: 'heheee'
  }
];

// https://jsperf.com/generateid-01/1
const generateId = (items) => 1 + items.reduceRight(
  (max, item) => item.id < max ? max : item.id,
  -1
);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/persons', (req, res) => {
  res.json(persons);
});

app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const person = persons.find(person => person.id === id);

  if(!person) {
    res.status(404).end();
    return;
  }
  res.json(person);
});

app.post('/persons', (req, res) => {
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

app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
  console.log(persons);
});

const port = 3001;

app.listen(port, () => {
  console.log('Listening: http://localhost:' + port);
});

