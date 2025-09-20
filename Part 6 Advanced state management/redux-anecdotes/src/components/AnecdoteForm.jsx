import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { getCreateNoteNotificationMsg, hideNotification, showNotification } from "../reducers/notificationReducer"
import anecdotesServices from './../services/anecdotes'

const NOTIFICATION_DELAY = 5000

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const handleNewAnecdote = async (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        if(newAnecdote && newAnecdote.length) {
            const payload = {
                content: newAnecdote,
                votes: 0
            }
            const createdAnecdote = await anecdotesServices.createAnecdote(payload)
            dispatch(createNewAnecdote(createdAnecdote))
            dispatch(showNotification(getCreateNoteNotificationMsg(newAnecdote)))
            setTimeout(() => {
                dispatch(hideNotification(''))
            }, NOTIFICATION_DELAY)
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