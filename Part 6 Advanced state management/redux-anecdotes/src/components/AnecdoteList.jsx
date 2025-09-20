import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { vote, setAnecdotes } from "../reducers/anecdoteReducer"
import { useEffect } from "react"
import anecdotesServices from "../services/anecdotes"

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
    const handleVote = async (id) => {

        const foundAnecdote = anecdotes.find((a) => a.id === id)
        if(foundAnecdote) {
            const candidate = { ...foundAnecdote }
            candidate.votes++
            const updatedAnecdote = await anecdotesServices.updateAnecdote(candidate)
            dispatch(vote(id))
        }
        
    }

    useEffect(() => {
        (async () => {
            const initialAnecdotes = await anecdotesServices.getAllAnecdotes()
            dispatch(setAnecdotes(initialAnecdotes))
        })()
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