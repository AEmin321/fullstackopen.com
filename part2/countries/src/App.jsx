import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchedCountries from './components/searchedCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const result = countries.filter(item=>item.name.common.includes(search))
  
  useEffect (()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res=>{
      setCountries(res.data)
    })
  },[])

  const handleQuery = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>
        <label htmlFor="search">Search for country:</label>
        <input type="text" id='search' onChange={handleQuery}/>
        <div>
          {result.length < 10 ? <SearchedCountries countryList={result}/>  : `${result.length} result found, specify another filter.`}
        </div>
      </div>
    </div>
  )
}

export default App
