import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {},
      top: null
    }
  }

  voteAnecdote() {
    const {selected, votes, top} = this.state;
    votes[selected] = votes[selected] ? votes[selected] += 1 : 1;

    const newTop = votes[selected] > (votes[top] || 0) ? selected : top;

    this.setState({votes, top: newTop})
  }

  randomizeAnecdote() {
    const selected = Math.floor(Math.random()*anecdotes.length); //yeah is from so
    const newState = Object.assign(this.state, {selected});

    this.setState(newState);
  }

  render() {
    const {anecdotes} = this.props;
    const {selected, votes, top} = this.state;


    return (
      <div>
        {anecdotes[selected]}
        <br />
        has {votes[selected] ? votes[selected] : 0} votes
        <br/  >
        <button onClick={() => this.randomizeAnecdote()}>next</button>
        <button onClick={() => this.voteAnecdote()}>vote</button>
        <br/  >

        {top !== null &&
          <div>
            <h3>anecdote with most votes</h3>
            <p>{anecdotes[top]}</p>
            has {votes[top] ? votes[top] : 0} votes
          </div>
        }
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)