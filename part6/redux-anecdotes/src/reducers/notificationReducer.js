import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers: {
        setNotification (state, action) {
            return action.payload
        },
        removeNotification () {
            return '';
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const setNotificationTo = (notification,duration) => {
    return dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, duration*1000);
    }
}

export default notificationSlice.reducer