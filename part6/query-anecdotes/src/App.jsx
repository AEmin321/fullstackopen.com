import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/requests'

const App = () => {
  const { isError,isLoading,data } = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry:1
  })

  if (isLoading){
    return <div>Loading the data. Please wait...</div>
  }

  if (isError){
    return <div>Anecdote service is not avaiable currently due to <strong>problems in the server.</strong></div>
  }

  const handleVote = (anecdote) => {
    console.log('vote')
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
