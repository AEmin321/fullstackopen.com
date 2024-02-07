import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    addAnecdote (state, action) {
      state.push({
        content:action.payload,
        id: getId(),
        votes: 0
      })
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