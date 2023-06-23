import {useEffect, useState} from "react"
import getFormattedWeather from "./Services/WeatherServices"
import {Input} from "./components/Input"
import {TempetureAndInfo} from "./components/TempetureAndInfo"
import {TimeAndLocation} from "./components/TimeAndLocation"
import {TopButtons} from "./components/TopButtons"
import {AppContext} from "./context/AppContext"
export const App = () => {
  const [weather, setWeather] = useState()
  const {city} = AppContext()
  console.log(city)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    try {
       setLoading(true)
      const weatherData = async () => {
        const data = await getFormattedWeather(city)
        setWeather(data)
      }
      weatherData()
    } catch (error) {
      setLoading(false)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [city])

  let tempC
  let tempF
  if (weather) {
    const {temp_c, temp_f} = weather
    tempC = temp_c
    tempF = temp_f
  }
  let backgroundWeather
  if (tempC >= 28 || tempF >= 82) {
    backgroundWeather = "bg-gradient-to-br from-orange-600 to-orange-200"
  } else if (tempC <= 28 || tempF <= 82) {
    backgroundWeather = "bg-gradient-to-br  from-cyan-600 to-sky-500 "
  } else if (tempC <= 9 || tempF <= 48.2) {
    backgroundWeather = "bg-gradient-to-br  from-cyan-300 to-sky-200 "
  }
  console.log(backgroundWeather)
  return (
    <div
      className={`md:max-w-screen-xl mx-auto min-h-screen rounded shadow-xl md:my-4 transition  ${backgroundWeather}`}>
      <div className="w-full max-h-screen">
        <div className="flex flex-col items-center">
          <TopButtons />
          <Input />
        </div>
        {!weather && (
          <p className=" text-center text-white text-base mr-16 opacity-25  md:text-xl">
            Enter the City Name
          </p>
        )}
        {error && <p>error.message</p>}
        {loading && <p>loading...</p>}
        {weather && (
          <>
            <TimeAndLocation
              time={weather.localtime_epoch}
              timeZone={weather.tz_id}
              cityInfo={weather}
            />
            <TempetureAndInfo weather={weather} />
          </>
        )}
      </div>
      <div className="flex justify-center items-center"></div>
    </div>
  )
}
