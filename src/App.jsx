import {useEffect, useState} from "react"
import getFormattedWeather from "./Services/WeatherServices"
import {Input} from "./components/Input"
import {TempetureAndInfo} from "./components/TempetureAndInfo"
import {TimeAndLocation} from "./components/TimeAndLocation"
import {TopButtons} from "./components/TopButtons"
import {AppContext} from "./context/AppContext"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const App = () => {
  const [weather, setWeather] = useState()
  const {city,currentLocation} = AppContext()
  useEffect(() => {
    const location = city?city:"Current location"
    try {
      toast.info(`loading ${location} weather`, {
        position: "top-right",
        autoClose: 1000,
      })
      const weatherData = async () => {
        const data = await getFormattedWeather(city?city:currentLocation)
        setWeather(data)
      }
      weatherData()
    } catch (error) {
      toast.error(`error fetching ${location} weather`, {
        position: "top-right",
        autoClose: 2000,
      })
    } finally {
      toast.success(`${location} weather`, {
        position: "top-right",
        autoClose: 2000,
      })
    }
  }, [city, currentLocation])
  console.log(city)
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
    backgroundWeather = "bg-gradient-to-br from-cyan-600 to-sky-500"
  } else if (tempC <= 9 || tempF <= 48.2) {
    backgroundWeather = "bg-gradient-to-br from-cyan-300 to-sky-200"
  }

  return (
    <>
      <ToastContainer toastClassName="mobile-toast " />
      <div
        className={`md:max-w-screen-xl mx-auto min-h-screen rounded shadow-xl md:my-4 transition duration-500 ease-in-out ${backgroundWeather} sm:p-4 overflow-y-auto`}>
        <div className="w-full max-h-screen">
          <div className=" flex-row lg:flex justify-center items-center">
            <TopButtons />
            <Input />
          </div>
          {weather && (
            <>
              <TimeAndLocation
                time={weather.localtime_epoch}
                timeZone={weather.tz_id}
                cityInfo={weather}
                className="sm:w-1/2"
              />
              <TempetureAndInfo weather={weather} className="sm:w-1/2" />
            </>
          )}
        </div>
        <div className="flex justify-center items-center sm:mt-4"></div>
      </div>
    </>
  )
}
