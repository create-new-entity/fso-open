import { useDispatch } from "react-redux"
import { saveNewAnecdote } from "../reducers/anecdoteReducer"
import { getCreateNoteNotificationMsg, setNotification } from "../reducers/notificationReducer"

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
            dispatch(saveNewAnecdote(payload))
            dispatch(setNotification(getCreateNoteNotificationMsg(newAnecdote), NOTIFICATION_DELAY))
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