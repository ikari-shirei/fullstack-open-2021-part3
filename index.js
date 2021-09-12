const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config() // Before person
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.set('Content-Security-Policy', "default-src 'none'")

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

let personsLength = 0

Person.countDocuments({}, function (err, count) {
  return count
})
  .then((value) => {
    personsLength = value
    return value
  })
  .catch((err) => {
    console.log(err)
    return 'ERROR'
  })

const currentDate = new Date()

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  response.send(
    `Phonebook has info for ${personsLength} people` + '<br/>' + currentDate
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((p) => p.id === id)

  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  Person.find({})
    .then((result) => {
      return result
    })
    .then((result) => {
      const isNameExist = result.find((person) => body.name === person.name)

      if (!body.name) {
        return response.status(400).json({
          error: 'there must be a name',
        })
      } else if (!body.number) {
        return response.status(400).json({
          error: 'there must be number',
        })
      } else if (isNameExist) {
        return response.status(400).json({
          error: 'name must be unique',
        })
      } else {
        const newPerson = new Person({
          name: body.name,
          number: body.number,
          date: new Date(),
        })

        newPerson.save().then((savedNote) => {
          response.json(savedNote)
        })
      }
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
