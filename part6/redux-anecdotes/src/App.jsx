import AnecdoteForm from './components/AnecdoteForm'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initilizeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initilizeAnecdotes())
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