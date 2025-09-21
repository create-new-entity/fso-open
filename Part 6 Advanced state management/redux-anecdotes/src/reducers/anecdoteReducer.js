import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from './../services/anecdotes'

const sortAnecdotes = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({ // 6.11
  name: 'anecdote',
  initialState: [],
  reducers: {
    update(state, action) {
      const foundAnecdote = state.find(anecdote => {
        return anecdote.id === action.payload.id
      })
      if(foundAnecdote) {
        foundAnecdote.votes = action.payload.votes
      }
      return state.sort(sortAnecdotes)
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

export const saveNewAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdotesServices.createAnecdote(newAnecdote)
    dispatch(createNewAnecdote(savedAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesServices.updateAnecdote(anecdote)
    dispatch(update(updatedAnecdote))
  }
}

export const { update, createNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer