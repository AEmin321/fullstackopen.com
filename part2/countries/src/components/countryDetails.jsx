const CountryDetails = ({country,weather,city}) => {
    const languages=Object.values(country.languages)

    return <div className="container"><div>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} alt={country.flags.alt} />
            <p><strong>Capital :</strong> {country.capital[0]}</p>
            <p><strong>Population :</strong> {country.population}</p>
            <p><strong>Area :</strong> {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(item=><li key={item}>{item}</li>)}
            </ul>
        </div>
        <div>
            <h1>{`Weather in ${city}`}</h1>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather icon" />
            <p><strong>Temperature :</strong> {weather.main.temp}</p>
            <p><strong>Wind :</strong> {weather.wind.speed}</p>
            <p><strong>Humidity :</strong> {weather.main.humidity}</p>
            <p><strong>Feels like :</strong> {weather.main.feels_like}</p>
        </div>
    </div>
}

export default CountryDetails