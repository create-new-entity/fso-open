import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const handleNewAnecdote = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        if(newAnecdote && newAnecdote.length) {
            dispatch(createNewAnecdote(newAnecdote))
        }
        e.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm