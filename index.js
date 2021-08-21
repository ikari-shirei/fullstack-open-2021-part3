const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

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

const personsLength = persons.length
const currentDate = new Date()

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

function generateId() {
  const maxId = personsLength > 0 ? Math.max(...persons.map((p) => p.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const isNameExist = persons.find((person) => body.name === person.name)

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
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
    date: new Date(),
  }

  persons = persons.concat(newPerson)
  console.log(body)
  return response.status(200).json()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
