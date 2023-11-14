const PersonForm = ({newName,handleName,newNumber,handleNumber,handleSubmit})=> {
    return <form>
        <div>
            name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
            number: <input value={newNumber} type="tel" onChange={handleNumber}/>
        </div>
        <div>
            <button onClick={handleSubmit} type="submit">add</button>
        </div>
  </form>
}

export default PersonForm;