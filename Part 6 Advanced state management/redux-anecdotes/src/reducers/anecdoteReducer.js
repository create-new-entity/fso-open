const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
const sortAnecdotes = (a, b) => b.votes - a.votes

const anecdoteReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'VOTE':
      const candidateId = action.payload.id
      return state.map((anecdote) => {
        if(anecdote.id !== candidateId) {
          return anecdote
        }
        const newAnecdote = { ...anecdote }
        newAnecdote.votes++
        return newAnecdote
      }).sort(sortAnecdotes)
    
    case 'NEW_ANECDOTE':
      const newNote = {
        ...action.payload,
        id: getId()
      }
      return state.concat(newNote)

    default:
      return state
  }

  return state
}

export const vote = (anecdoteId) => { // 6.6
  return {
    type: 'VOTE',
    payload: {
      id: anecdoteId
    }
  }
}

export const createNewAnecdote = (anecdote) => { // 6.6
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: anecdote,
      votes: 0
    }
  }
}

export default anecdoteReducer