import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from './../services/anecdotes'

const sortAnecdotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({ // 6.11
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const candidateId = action.payload
      const foundAnecdote = state.find((anecdote) => {
        return anecdote.id === candidateId
      })
      if(foundAnecdote) {
        foundAnecdote.votes++
      }
      return state
        .sort(sortAnecdotes)
    },
    createNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort(sortAnecdotes)
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { vote, createNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer