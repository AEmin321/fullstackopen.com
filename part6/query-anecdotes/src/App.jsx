import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdoteVote } from './services/requests'
import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn:updateAnecdoteVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.map(item=>item.id===updatedAnecdote.id ? updatedAnecdote : item))
    }
  })

  const { isError,isLoading,data } = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry:1,
    refetchOnWindowFocus: false
  })

  if (isLoading){
    return <div>Loading the data. Please wait...</div>
  }

  if (isError){
    return <div>Anecdote service is not avaiable currently due to <strong>problems in the server.</strong></div>
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote,votes:anecdote.votes+1}
    updateAnecdoteMutation.mutate(updatedAnecdote)
    dispatch({type:'ADD_NOTIFICATION',payload:anecdote.content+' voted.'})
    setTimeout(() => {
      dispatch({type:'REMOVE_NOTIFICATION'})
    }, 5000);
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
