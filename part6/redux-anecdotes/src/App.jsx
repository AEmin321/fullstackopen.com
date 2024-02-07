import AnecdoteForm from './components/AnecdoteForm'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setInitialNotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAnecdotes().then(anecdotes=>dispatch(setInitialNotes(anecdotes)))
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create New Anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App