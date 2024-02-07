import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    addAnecdote (state, action) {
      state.push(action.payload)
    },
    updateVote (state, action) {
      const theID = action.payload
      const anecdoteToUpdate = state.find(item=>item.id===theID)
      const updatedAnecdote = {...anecdoteToUpdate, votes:anecdoteToUpdate.votes + 1}
      return state.map(item=>item.id===theID ? updatedAnecdote : item)
    },
    setInitialNotes (state, action) {
      return action.payload
    }
  }
})

export const { updateVote, addAnecdote, setInitialNotes } = anecdoteSlice.actions

export const initilizeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAnecdotes()
    dispatch(setInitialNotes(response))
  }
}
export default anecdoteSlice.reducer