import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"

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