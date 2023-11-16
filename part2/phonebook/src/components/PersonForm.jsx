const PersonForm = ({newName,handleName,newNumber,handleNumber,handleSubmit})=> {
    return <form>
        <div className="input-con">
            <label htmlFor="name">Name :</label> <input id="name" value={newName} onChange={handleName}/>
        </div>
        <div className="input-con">
            <label htmlFor="number">Number :</label><input id="number" value={newNumber} type="tel" onChange={handleNumber}/>
        </div>
        <div className="input-con">
            <button onClick={handleSubmit} type="submit">add new contact</button>
        </div>
  </form>
}

export default PersonForm;