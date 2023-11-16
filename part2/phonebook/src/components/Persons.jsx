const Person = ({persons})=> {
    return <ol>
        {persons.map(item=><li key={item.id}>{item.name} - {item.number}</li>)}
  </ol>
}

export default Person;