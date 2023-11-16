const Person = ({persons,handleDelete})=> {
    return <ol>
        {persons.map(item=><li key={item.id}>{item.name} - {item.number}  <button className="sec-btn" onClick={()=>handleDelete(item.id)}>delete</button></li>)}
  </ol>
}

export default Person;