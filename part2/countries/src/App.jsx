import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchedCountries from './components/searchedCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])

  
  useEffect (()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res=>{
      setCountries(res.data)
    })
  },[])

  const handleQuery = (event) => {
    setSearchedCountries(countries.filter(item=>item.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(searchedCountries)
  }

  const handleShowMore = (countryName) => {
    const getItem = searchedCountries.find(item=>item.name.common===countryName)
    setSearchedCountries([getItem])
  }

  return (
    <div>
      <div>
        <label htmlFor="search">Search for country:</label>
        <input type="text" id='search' onChange={handleQuery}/>
        <div>
          {searchedCountries.length < 10 ? <SearchedCountries countryList={searchedCountries} handleShowMore={handleShowMore}/>  : `${searchedCountries.length} result found, specify another filter.`}
        </div>
      </div>
    </div>
  )
}

export default App
