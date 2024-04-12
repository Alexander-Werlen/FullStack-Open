import { useState, useEffect } from "react"
import axios from "axios"


const api_key = import.meta.env.VITE_SOME_KEY
const countriesDataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

function App() {

  const [country, setCountry] = useState('')
  const [countryData, setCountryData] = useState(null)
  const [countryWeatherData, setCountryWeatherData] = useState(null)
  const [countriesNames, setCountriesNames] = useState([])

  const countryNamesMatches = countriesNames.filter(countryName => countryName.toLowerCase().includes(country.toLowerCase()))

  const amountOfMatches = countryNamesMatches.length

  useEffect(() => {
    axios.get(countriesDataUrl).then((res) => {
      setCountriesNames(res.data.map((country) => country.name.common))
    })
  }, [])

  useEffect(() => {
    if(amountOfMatches!=1) return;
    const matchedCountryName = countryNamesMatches[0]
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${matchedCountryName}`).then((res) => {
      console.log(res)
      setCountryData(res.data)
      return res.data.latlng
    }).then((latlng) => {
      
      console.log(latlng)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`).then((res) => {
        console.log(res)
        setCountryWeatherData(res.data)
      })
    }).catch(err => console.log(err))
  }, [country])

  return (
    <> 
      <div>Find Country: </div>
      <input value={country} onChange={(e) => {setCountry(e.target.value)}}></input>
      { amountOfMatches<=10 && amountOfMatches>1 && 
        countryNamesMatches.filter((countryName) => countryName).map((countryName) => 
          <div key={countryName}>{countryName} <button onClick={() => setCountry(countryName)}>show</button></div>
        )
      }
      { amountOfMatches>10 &&
        <div>To many matches. Write a country</div>
      }
      { amountOfMatches===1 && countryData && countryWeatherData &&
        <>
        <h1>{countryData.name.common}</h1>
        <div>Capital {countryData.capital}</div>
        <div>Area {countryData.area}</div>
        <h3>Languages:</h3>
        {Object.values(countryData.languages).map(lang => <li key={lang}>{lang}</li>)}
        <img src={countryData.flags.png} alt={countryData.flags.alt}/>
        <h2>Weather in {country}</h2>
        <img src={`https://openweathermap.org/img/wn/${countryWeatherData.weather[0].icon}@2x.png`} alt="Weather Icon"/>
        <div>Temperature {countryWeatherData.main.temp}</div>
        <div>Wind {countryWeatherData.wind.speed}m/s</div>
        </>
      }
    </>
  )
}

export default App
