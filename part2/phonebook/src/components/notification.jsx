const Notification = ({message})=> {
    const notiStyle={
        color:'white',
        background:'linear-gradient(225deg, #1cc975 0%, #f1b086 100%)',
        padding:'6px 12px',
        borderRadius:5
    }
    if (message==null) {
        return null
    }
    return <div style={notiStyle} className="notification">{message}</div>
}

export default Notification;