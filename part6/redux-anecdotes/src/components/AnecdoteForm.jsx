import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value= ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(content+' Added to the list.'))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 2000);
    }
  return (
    <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm