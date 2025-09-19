import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { vote } from "../reducers/anecdoteReducer"

const selectFilteredItems = createSelector(
    [
        (state) => state.anecdotes,
        (state) => state.filter
    ],
    (anecdotes, filter) => {
        if(filter) {
            return anecdotes.filter((anecdote) => {
                return anecdote.content.includes(filter)
            })
        }
        return anecdotes
    }
)

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(selectFilteredItems)
    const handleVote = (id) => {
        dispatch(vote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList