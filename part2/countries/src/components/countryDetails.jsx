const CountryDetails = ({country}) => {
    const languages=Object.values(country.languages)
    
    return <div>
        <h1>{country.name.common}</h1>
        <img src={country.flags.png} alt={country.flags.alt} />
        <p><strong>Capital :</strong> {country.capital[0]}</p>
        <p><strong>Population :</strong> {country.population}</p>
        <p><strong>Area :</strong> {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {languages.map(item=><li>{item}</li>)}
        </ul>
    </div>
}

export default CountryDetails