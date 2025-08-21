import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const noFeedback = good + neutral + bad === 0
  if( noFeedback ) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={good + neutral + bad} />
      <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticsLine text="positive" value={`${(good / (good + neutral + bad)) * 100} %`} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App