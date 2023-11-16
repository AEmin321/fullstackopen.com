const Filter = ({filterValue,handleFilter}) => {
    return <div className="input-con">
        <label htmlFor="filter">Filter :</label><input id="filter" value={filterValue} onChange={handleFilter} type='text'/>
    </div>
}

export default Filter;