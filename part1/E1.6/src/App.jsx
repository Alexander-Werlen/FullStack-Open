import { useState } from 'react'

const Button = ({name, state, setState}) => {
  return (
    <button onClick={() => setState(state+1)}>{name}</button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if(all){
    return (
      <table>
      <Statistic name='good' state={good}></Statistic>
      <Statistic name='neutral' state={neutral}></Statistic>
      <Statistic name='bad' state={bad}></Statistic>
      <Statistic name='all' state={all}></Statistic>
      <tr>
        <td>Average</td>
        <td>{(good-bad)/all}</td>
      </tr>
      <tr>
        <td>Positive</td>
        <td>{(good)*100/all}%</td>
      </tr>
     </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const Statistic = ({name, state}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{state}</td>
    </tr>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad

  return (
    <>
      <h1>give feedback</h1>
      <Button name={'good'} state={good} setState={setGood}></Button>
      <Button name={'neutral'} state={neutral} setState={setNeutral}></Button>
      <Button name={'bad'} state={bad} setState={setBad}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>

    </>
  )
}

export default App