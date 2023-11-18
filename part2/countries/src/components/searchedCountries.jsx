import CountryDetails from './countryDetails'

const SearchedCountries = ({countryList,handleShowMore}) => {
    if (countryList.length === 1) {
        return <CountryDetails country={countryList[0]}/>
    }
    return <ul>
        {countryList.map(item=><li key={item.name.common}>{item.name.common}<button onClick={()=>handleShowMore(item.name.common)}>Show More</button></li>)}
    </ul>
}

export default SearchedCountries