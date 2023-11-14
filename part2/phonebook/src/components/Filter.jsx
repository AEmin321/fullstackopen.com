const Filter = ({filterValue,handleFilter}) => {
    return <div>
        filter shown with : <input value={filterValue} onChange={handleFilter} type='text'/>
    </div>
}

export default Filter;