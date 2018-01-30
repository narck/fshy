
import ReactDOM from 'react-dom'
import {all, remove, add, update} from './resource'
import React from 'react';


const Person = ({p, r}) => {
  return (
    <div>
    <p>{p.name}: {p.number}</p>
     <button onClick={() => r(p)}>poista</button >
    </div>
  )
}
const PersonList = ({persons, removeHandler}) => {
  return (
    <div>
      {persons.map((p) => <Person key={p.id} p={p} r={removeHandler} />)}
      </div>
  )
}

class App extends React.Component {
    state = {
      persons: [],
      newName: '',
      newNumber: '',
      searchedStr: '',
    }

  updatePersons = (persons) => this.setState({persons})
  removePerson = (person) => window.confirm("are u sure?") && remove(person).then(this.refresh)
  refresh = () => all().then(this.updatePersons)

  componentWillMount() {
    this.refresh()
  }



  addPerson = (e) => {
    e.preventDefault()
    const name = this.state.newName;
    const number = this.state.newNumber;
    const newPerson = {name, number};

    const foundPerson = this.state.persons.find((x) => x.name === newPerson.name);

    if (foundPerson && window.confirm('already exists. wana replace?')) {
      update({...foundPerson, number}).then(this.refresh)
    }
    else {

      const persons = this.state.persons.concat(newPerson);

      add(newPerson).then(this.refresh)
    }

  }

  handleNameChange = (e) => this.setState({newName: e.target.value})
  handleNumberChange = (e) => this.setState({newNumber: e.target.value})
  handleSEarchChange = (e) => this.setState({searchedStr: e.target.value})


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
        <PersonList persons={filteredPersons} removeHandler={this.removePerson} />

      </div>
    )
  }
}


export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)