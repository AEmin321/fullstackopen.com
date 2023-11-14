const Person = ({persons})=> {
    return <ul>
        {persons.map(item=><li key={item.id}>{item.name} - {item.number}</li>)}
  </ul>
}

export default Person;