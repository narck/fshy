import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  const osta = props.kurssi.osat
  const paska = osta.map((x) => <Osa key={x.nimi} osa={x.nimi} tehtavia={x.tehtavia} />)
  return(
    <div>
      {paska}
    </div>
  )
}
const Yhteensa = (props) => {
  const sum = props.kurssi.osat.reduce((a,b) => a+b.tehtavia,0);
  return(
    <p>yhteensä {sum} tehtävää</p>
  )
}

const Kurssi = ({kurssi}) => {
  return(<div>
    <Otsikko kurssi={kurssi}/>
    <Sisalto kurssi={kurssi} />
    <Yhteensa kurssi={kurssi}  />
  </div>)
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    kurssit.map((kurssi) => <Kurssi key={kurssi.id} kurssi={kurssi} />)
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)