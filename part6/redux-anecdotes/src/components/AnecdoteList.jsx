import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== '') {
            return state.anecdotes.filter(anecdote =>anecdote.content.includes(state.filter))
        }
        return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const Vote = (id) => {
        dispatch(updateVote(id))
        const anecdote = anecdotes.find(item=>item.id===id)
        dispatch(setNotification('You voted '+ anecdote.content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 2000);
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => Vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList