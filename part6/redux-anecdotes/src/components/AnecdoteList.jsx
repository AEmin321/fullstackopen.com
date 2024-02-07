import { useDispatch, useSelector } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { setNotificationTo } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== '') {
            return state.anecdotes.filter(anecdote =>anecdote.content.includes(state.filter))
        }
        return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const Vote = (id) => {
        const anecdote = anecdotes.find(item=>item.id===id)
        dispatch(updateVotes(id,{...anecdote,votes:anecdote.votes+1}))
        dispatch(setNotificationTo('You voted '+ anecdote.content,3))
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