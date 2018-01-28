
import ReactDOM from 'react-dom'

import React from 'react';

const Person = ({p}) => {
  return (
    <p>{p.name}</p>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (e) => {
    const personExists = this.state.persons.map(x => x.name).includes(this.state.newName);

    e.preventDefault()
    const newp = this.state.newName;
    const persons = this.state.persons.concat({name: newp});
    if (personExists) {
      alert('already exists')
    }
    else {
      this.setState({...this.state, persons})
    }

  }


  handleNoteChange = (e) => {
    this.setState({...this.state, newName: e.target.value})
  }



  render() {
    const {persons} = this.state;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input             value={this.state.newNote}
            onChange={this.handleNoteChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {persons.map((p) => <Person key={p.name} p={p} />)}
      </div>
    )
  }
}


export default App
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)