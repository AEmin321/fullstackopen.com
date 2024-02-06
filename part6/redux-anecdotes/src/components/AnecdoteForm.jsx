import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value= ''
        dispatch(addAnecdote(content))
    }
  return (
    <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm