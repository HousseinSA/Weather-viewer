const apiKey = process.env.REACT_APP_APIKEY
const BaseUrl = `https://api.weatherapi.com/v1/forecast.json?`
const getWeatherData = async (infoType) => {
  const url = new URL(`${BaseUrl}`)
  url.search = new URLSearchParams({q: infoType, key: apiKey, days: 7})
  return await fetch(url).then((res) => res.json())
}
const getCurrentWeather = (data) => {
  const {
    location: {name, lat, lon, localtime_epoch, tz_id, region, country},
    current: {
      temp_c,
      temp_f,
      condition: {icon, text},
      wind_kph,
      wind_mph,
      humidity,
      feelslike_c,
      feelslike_f,
      pressure_in,
    },
    forecast: {forecastday},
  } = data

  const currentTimestamp = localtime_epoch
  let hourlyForecast = []
  for (const day of forecastday) {
    for (const hour of day.hour) {
      if (hour.time_epoch > currentTimestamp) {
        hourlyForecast.push(hour)
      }
    }
  }
  let dailyForecast = []
  for (const day of forecastday) {
    if (day.date_epoch > currentTimestamp) {
      dailyForecast.push(day)
    }
  }
  const {
    astro: {sunrise, sunset},
    day: {maxtemp_c, maxtemp_f, mintemp_c, mintemp_f},
  } = forecastday[0]
  return {
    name,
    lat,
    lon,
    localtime_epoch,
    tz_id,
    temp_c,
    temp_f,
    icon,
    text,
    wind_kph,
    wind_mph,
    humidity,
    region,
    country,
    feelslike_c,
    feelslike_f,
    sunrise,
    sunset,
    pressure_in,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    hourlyForecast,
    dailyForecast,
  }
}
const getFormattedWeather = async (typeInfo) => {
  const formattedCurrentWeather = await getWeatherData(typeInfo).then(
    getCurrentWeather
  )
  return formattedCurrentWeather
}
export default getFormattedWeather
