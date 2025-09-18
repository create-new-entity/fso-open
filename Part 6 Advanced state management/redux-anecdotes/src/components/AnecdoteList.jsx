import { useDispatch, useSelector } from "react-redux"
import * as R from 'ramda'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const { allAnecdotes, filteredAnecdotes } = useSelector((state) => {
        return R.pick(['allAnecdotes', 'filteredAnecdotes'], state.anecdotes)
    })
    const handleVote = (id) => {
        dispatch(vote(id))
    }
    const anecdotes = allAnecdotes.filter(anecdote => {
        if(filteredAnecdotes.length) {
            return filteredAnecdotes.includes(anecdote.id)
        }
        return false
    })
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