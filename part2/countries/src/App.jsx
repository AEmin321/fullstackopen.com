import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchedCountries from './components/searchedCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [weather, setWeather] = useState({
    weather:{0:{icon:""}},
    main:{temp:"",humidity:"",feels_like:""},
    wind:{speed:""}
  })
  const [city, setCity] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY
  
  useEffect (()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res=>{
      setCountries(res.data)
    })
  },[])

  useEffect(()=>{
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`).then(res=>{
      setWeather(res.data)
    })
    }
  },[city])

  const handleQuery = (event) => {
    const arr=countries.filter(item=>item.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchedCountries(arr)
    if (arr.length===1) {
      setCity(arr[0].capital[0])
    }
  }

  const handleShowMore = (countryName) => {
    const getItem = searchedCountries.find(item=>item.name.common===countryName)
    setCity(getItem.capital[0])
    setSearchedCountries([getItem])
  }

  return (
      <div>
        <label htmlFor="search">Search for country:</label>
        <input type="text" id='search' onChange={handleQuery}/>
        <div>
          {searchedCountries.length < 10 ? <SearchedCountries countryList={searchedCountries} handleShowMore={handleShowMore} setCity={setCity} weather={weather} city={city}/>  : `${searchedCountries.length} result found, specify another filter.`}
        </div>
      </div>
  )
}

export default App
