import CountryDetails from './countryDetails'
const SearchedCountries = ({countryList}) => {
    if (countryList.length === 1) {
        return <CountryDetails country={countryList[0]}/>
    }
    return <ul>
        {countryList.map(item=><li key={item.name.common}>{item.name.common}</li>)}
    </ul>
}

export default SearchedCountries