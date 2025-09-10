import { useState } from 'react'

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getIndexOfAnecdoteWithMostVotes(votes) {
  return Object.keys(votes).reduce((maxIndex, currentIndex) => {
    return votes[currentIndex] > votes[maxIndex] ? currentIndex : maxIndex;
  }, 0);
}

const AnecdoteTitle = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const AnecdoteAndVotes = ({ anecdote, votes }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes || 0} votes</div>
    </>
  )
}

const AnecdoteOfTheDay = ({ anecdote, votes, handleVote, handleNextAnecdote }) => {
  return (
    <>
      <AnecdoteTitle text="Anecdote of the day" />
      <AnecdoteAndVotes anecdote={anecdote} votes={votes} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
    </>
  )
}

const AnecdoteWithMostVotes = ({ anecdote, votes }) => {
  return (
    <>
      <AnecdoteTitle text="Anecdote with most votes" />
      <AnecdoteAndVotes anecdote={anecdote} votes={votes} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({});

  const handleNextAnecdote = () => {
    const randomIndex = Math.trunc(getRandomArbitrary(0, anecdotes.length));
    setSelected(randomIndex);
  }

  const handleVote = () => {
    const newVotes = {
      ...votes,
      [selected]: (votes[selected] || 0) + 1
    }
    setVotes(newVotes);
  }

  const indexOfAnecdoteWithMostVotes = getIndexOfAnecdoteWithMostVotes(votes);
  const anecdoteWithMostVotes = anecdotes[indexOfAnecdoteWithMostVotes];
  const votesForAnecdoteWithMostVotes = votes[indexOfAnecdoteWithMostVotes] || 0;

  return (
    <>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleVote={handleVote}
        handleNextAnecdote={handleNextAnecdote}
      />
      <AnecdoteWithMostVotes
        anecdote={anecdoteWithMostVotes}
        votes={votesForAnecdoteWithMostVotes}
      />
    </>
  )
}

export default App