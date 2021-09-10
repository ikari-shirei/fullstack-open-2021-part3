const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]
const password = process.argv[2]

const url = `mongodb+srv://ikari-shirei:${password}@cluster0.ipfcj.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
  date: new Date(),
})

if (name && number && process.argv.length === 5) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length > 5) {
  console.log('You must have only name and number')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (!number || !name) {
  console.log('You must have name and number')
  process.exit(1)
}
