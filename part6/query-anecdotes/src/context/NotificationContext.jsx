import { createContext,useReducer,useContext } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.payload
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}
export const NotificationContextProvider = (props) => {
    const [notification,notificationDispatch] = useReducer(notificationReducer,'')
    return (
        <NotificationContext.Provider value={[notification,notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export const useNotificationValue = () => {
    const contextData = useContext(NotificationContext)
    return contextData[0]
}

export const useNotificationDispatch = () => {
    const contextData = useContext(NotificationContext)
    return contextData[1]
}

export default NotificationContext