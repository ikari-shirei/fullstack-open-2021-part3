const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config() // Before person
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.find({}).then((result) => {
    const isNameExist = result.find((person) => body.name === person.name)

    if (!body.name || !body.number) {
      next({ name: 'ContentMissing' })
    } else if (isNameExist) {
      next({ name: 'AlreadyAdded' })
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ContentMissing') {
    return response.status(400).json({ error: 'content missing' })
  } else if (error.name === 'AlreadyAdded') {
    return response.status(400).json({ error: 'name is already in the list' })
  }

  next(error)
}

//last loaded
app.use(errorHandler)
