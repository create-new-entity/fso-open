import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { handleNotification } from "../contexts/notificationUtils"
import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      handleNotification(`Created ${newAnecdote.content}`, dispatchNotification)
    },
    onError: (failedReq) => {
      handleNotification(failedReq.response.data.error, dispatchNotification)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
