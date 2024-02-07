import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value= ''
        const response = await anecdoteService.createAnecdote(content)
        dispatch(addAnecdote(response))
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