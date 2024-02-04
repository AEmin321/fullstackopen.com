import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        const filterValue = event.target.value
        dispatch(createFilter(filterValue))
    }
    const style = {
        marginBottom: 70
    }

    return (
        <div style={style}>
            <label htmlFor="filter"><strong>filter : </strong> <input type="text" name='filter' onChange={handleFilterChange}/></label>
        </div>
    )
}

export default Filter