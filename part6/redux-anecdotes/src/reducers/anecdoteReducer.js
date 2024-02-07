import { createSlice } from "@reduxjs/toolkit"

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
export default anecdoteSlice.reducer