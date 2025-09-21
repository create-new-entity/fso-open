import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { initializeAnecdotes, updateAnecdote } from "../reducers/anecdoteReducer"
import { useEffect } from "react"

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
        const foundAnecdote = anecdotes.find((a) => a.id === id)
        if(foundAnecdote) {
            const candidate = { ...foundAnecdote }
            candidate.votes++
            dispatch(updateAnecdote(candidate))
        }
    }

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

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