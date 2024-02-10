import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotificationDispatch } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: (createdAnecdote)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(createdAnecdote))
    },
    onError: ()=>{
      dispatch({type:'ADD_NOTIFICATION',payload:'Too short, your anecdote should be atleast 5 characters long.'})
      setTimeout(() => {
        dispatch({type:'REMOVE_NOTIFICATION'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content:content,votes:0})
    dispatch({type:'ADD_NOTIFICATION',payload:content+' added.'})
    setTimeout(() => {
      dispatch({type:'REMOVE_NOTIFICATION'})
    }, 5000);
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
