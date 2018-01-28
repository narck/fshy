
import ReactDOM from 'react-dom'
import axios from 'axios'

import React from 'react';


const Person = ({p}) => {
  return (
    <p>{p.name}: {p.number}</p>
  )
}
const PersonList = ({persons}) => {
  return (
    <div>
      {persons.map((p) => <Person key={p.name} p={p} />)}
      </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '1234' }
      ],
      newName: '',
      newNumber: '',
      searchedStr: '',
    }
  }

  componentWillMount() {
    axios.get("http://localhost:3001/persons")
    .then((persons) => this.setState(...this.state, {persons: persons.data}))
  }

  addPerson = (e) => {
    const personExists = this.state.persons.map(x => x.name).includes(this.state.newName);

    e.preventDefault()
    const name = this.state.newName;
    const number = this.state.newNumber;
    const persons = this.state.persons.concat({name, number});

    if (personExists) {
      alert('already exists')
    }
    else {
      this.setState({...this.state, persons})
    }

  }



  handleNameChange = (e) => this.setState({...this.state, newName: e.target.value})
  handleNumberChange = (e) => this.setState({...this.state, newNumber: e.target.value})
  handleSEarchChange = (e) => this.setState({...this.state, searchedStr: e.target.value})


  render() {
    const {persons, searchedStr} = this.state;

    const filteredPersons = (searchedStr.length >= 1) ?
                                                      persons.filter(x => x.name.toLowerCase().startsWith(searchedStr.toLowerCase())) :
                                                      persons

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
        rajaa näytettäviä: <input             value={this.state.searchedStr}
            onChange={this.handleSEarchChange}/>
        </form>

<br/>
<h1>Lisää uusi</h1>


        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input             value={this.state.newNote}
            onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input             value={this.state.newNumber}
            onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <PersonList persons={filteredPersons} />

      </div>
    )
  }
}


export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)