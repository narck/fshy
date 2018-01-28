import React from 'react'

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

export const Kurssi = ({kurssi}) => {
  return(<div>
    <Otsikko kurssi={kurssi}/>
    <Sisalto kurssi={kurssi} />
    <Yhteensa kurssi={kurssi}  />
  </div>)
}