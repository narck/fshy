import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
//   const kurssi = 'Half Stack -sovelluskehitys'
//   const osa1 = 'Reactin perusteet'
//   const tehtavia1 = 10
//   const osa2 = 'Tiedonvälitys propseilla'
//   const tehtavia2 = 7
//   const osa3 = 'Komponenttien tila'
//   const tehtavia3 = 14
const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  const Otsikko = (props) => {
      return (
        <h1>{props.course}</h1>
      )
  }

  const Osa = (props) => {
    return (
        <p>{props.a} {props.b}</p>
    )
}

  const Sisalto = (props) =>     {
      console.log(props)
    return (
      <div>
          {props.p.map((x) =>
            <Osa a={x.nimi} b={x.tehtavia} />
          )
          }
      </div>
    )
  }


const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.c.length} tehtävää</p>
    )
}

  return (
    <div>
      <Otsikko course={kurssi.nimi} />
        <Sisalto p={kurssi.osat} />
      <Yhteensa c={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)