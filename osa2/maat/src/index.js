import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  state = {
    countries: [],
    filterStr: ''
  }

  componentWillMount() {
    axios.get(  "https://restcountries.eu/rest/v2/all")
    .then((response) => this.setState({countries: response.data}))
  }

  filtedChanged = (e) => this.setState({filterStr: e.target.value})
  countryClicked = (filterStr) => this.setState({filterStr})

  render() {
    const {countries, filterStr} = this.state
    const nameStartsWithFilter = (c) => c.name.toLowerCase().startsWith(filterStr.toLowerCase())
    const filteredCountries = filterStr.length >= 1 ? countries.filter(nameStartsWithFilter) : countries

    const tooMany = filteredCountries.length >= 10 && filterStr.length >= 1
    const showCountryList = 1 < filteredCountries.length && filteredCountries.length <= 10
    const showDetailedCountry = filteredCountries.length === 1

    return (
    <div>
    <form>
    search for coutnry: <input value={this.state.filter} onChange={this.filtedChanged} />

    {tooMany && 'Too many countries, please filter'}

    {showCountryList &&
      <ul>
        {filteredCountries.map((c) => <li onClick={() => this.countryClicked(c.name)} key={c.name}>{c.name}</li>)}
      </ul>
    }


    {showDetailedCountry &&
        <div>
          <h1>{filteredCountries[0].name} {filteredCountries[0].nativeName}</h1>
        <br/>
        Capital: {filteredCountries[0].capital}
        <br/>
        Population: {filteredCountries[0].population}
        <br/>
        <img src={filteredCountries[0].flag} alt="moro" style={{maxWidth: 300}} />
        </div>
    }
    </form>
    </div>
  )}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)