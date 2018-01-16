import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, children}) => {
  return (
    <button onClick={handler}>{children}</button>
  )
}

const Statistic = ({k,v}) => {
  return (
    <tr>
  <td>
  {k}         </td>
  <td>{v} </td>
  </tr>
  )
}
const Statistics =  ({values}) => {
  const [a,b,c] = values;
  const sum = values.reduce((a,b) => a+b,0);
  const middleValue = sum/3;
  const positivePercentage = a / sum * 100;
  //yeah
  if (a === 0 && b === 0 && c === 0) {
    return (
      <span>
        ei yhtään palautetta annettu
      </span>
    )
  }
  else {
  return (
    <div>
    <table>
      <tbody>
        <Statistic k='hyvä' v={a} />
        <Statistic k='neutrali' v={b} />
        <Statistic k='huono' v={c} />
        <Statistic k='keskiarvo' v={middleValue.toFixed(1)} />
        <Statistic k='positiivisia' v={positivePercentage.toFixed(0)} />
      </tbody>
    </table>
</div>
  )
  }

}
class App extends React.Component {
  state = {
    a: 0,
    b: 0,
    c: 0,
  }

  incrKey = (key) => () => this.setState({[key]: this.state[key] + 1 });

  render() {
    const {a,b,c} = this.state;
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handler={this.incrKey('a')}>hyvä</Button>
        <Button handler={this.incrKey('b')}>neutraali</Button>
        <Button handler={this.incrKey('c')}>huono</Button>
        <h1>Statistiikka</h1>
        <Statistics values={[a,b,c]} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)