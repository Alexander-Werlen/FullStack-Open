import { useState } from 'react'

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [votes, setVotes] = useState(new Uint8Array(10))

  const handleVote = () => {
    console.log(selected)
    const updVotes = [...votes]
    updVotes[selected] += 1;
    setVotes(updVotes)
  }

  return (
    <>
    <h1>anecdote of the day</h1>
    <div>
      {anecdotes[selected]}
    </div>
    <button onClick={handleVote}>vote</button>
    <button onClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))}>next</button>
    <h1>anecdote with most votes</h1>
    <div>
      {anecdotes[indexOfMax(votes)]}
    </div>
    </>
  )
}

export default App