const Notification = ({ message }) => {
  const notiStyle={
    color:'white',
    background:'linear-gradient(225deg, #1cc975 0%, #f1b086 100%)',
    padding:'6px 12px',
    borderRadius:5
  }
  const erStyle={
    color:'white',
    background:'#FF6969',
    padding:'6px 12px',
    borderRadius:5
  }
  if (message===null) {
    return null
  }
  if (message.includes('ERROR')){
    return <div style={erStyle} className="notification">{message}</div>
  }
  return <div style={notiStyle}>{message}</div>

}

export default Notification