const args = process.argv.slice(2)

const mongoose = require('mongoose')
const url = 'mongodb://localhost'
mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const p = new Promise((re, rej) => {
    if (args.length === 0) {
        console.log('puhelinluettelo\n')

        re(Person.find({}).then((result) => {
            result.forEach(({name, number}) => {
                console.log(name + ' ' + number)
            });
        }))
    }
    else if (args.length === 2) {
        const [name, number] = args
        console.log('lisätään henkilö '+name + ' numero ' + number + ' luetteloon')
        const p = new Person({
            id: Math.ceil(Math.random()*1000),
            name, number
        })

        re(p.save())
    }


    rej()
}

)

const close = () => mongoose.connection.close()

p.then(close)
