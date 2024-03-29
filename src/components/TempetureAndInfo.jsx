import {
  UilSun,
  UilTear,
  UilTemperatureHalf,
  UilWind,
  UilArrowUp,
  UilArrowDown,
  UilMoon,
  UilSunset,
} from "@iconscout/react-unicons"
import {useState} from "react"
export const TempetureAndInfo = ({weather}) => {
  const [clicked, setClicked] = useState(false)
  const {
    text,
    feelslike_c,
    feelslike_f,
    wind_mph,
    sunrise,
    sunset,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    humidity,
    icon,
    hourlyForecast,
    temp_c,
    temp_f,
    dailyForecast,
    tz_id,
    wind_kph,
  } = weather
  return (
    <div className="p-4 md:w-3/4 mx-auto">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className=" text-lg md:text-xl lg:text-2xl text-MainColor capitalize">
          {text}
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex-1 flex justify-center">
            {icon !== "//cdn.weatherapi.com/weather/64x64/night/113.png" ? (
              <img
                src={`http://${icon}`}
                className="w-30 "
                alt="Weather Icon"
              />
            ) : (
              <UilMoon size={30} className="text-MainColor flex-1" />
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <span className=" md:text-xl text-lg lg:text-3xl text-white">
              {clicked ? temp_f.toFixed() : temp_c.toFixed()}&deg;
            </span>
            <div className="flex md:text-lg text-base lg:text-xl gap-2 justify-center items-center ml-8 ">
              <span
                onClick={() => setClicked(false)}
                className={`cursor-pointer ${
                  !clicked ? "text-white" : "text-gray-700 opacity:.5"
                } transition hover:scale-125`}>
                &deg;C
              </span>
              <span
                onClick={() => setClicked(true)}
                className={`cursor-pointer ${
                  clicked ? "text-white" : "text-gray-700 opacity:.5"
                } transition hover:scale-125`}>
                &deg;F
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className=" text-white flex flex-col gap-2">
              <div className=" flex gap-1 items-center">
                <UilTemperatureHalf />
                <p className="text-sm md:text-base">
                  feels like:{" "}
                  {clicked ? feelslike_f.toFixed() : feelslike_c.toFixed()}&deg;
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <UilTear />
                <p className="text-sm md:text-base">Humidity: {humidity}%</p>
              </div>
              <div className="flex gap-1  items-center">
                <UilWind />
                <p className="text-sm md:text-base">
                  wind:{" "}
                  {`${
                    clicked
                      ? wind_mph.toFixed() + " " + "Mp/h" //eslint-disable-line
                      : wind_kph.toFixed() + " " + "Km/h" //eslint-disable-line
                  }`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around flex-wrap  items-center text-white">
          <div className="flex items-center gap-2">
            <UilSun />
            <span className="md:text-lg text-sm">Rise: {sunrise}</span>
          </div>
          <div className="flex  items-center gap-2 ">
            <UilSunset />
            <span className="md:text-lg text-sm">Set: {sunset}</span>
          </div>
          <div className="flex items-center gap-2 ">
            <UilArrowUp />
            <span className="md:text-lg text-sm">
              High: {clicked ? maxtemp_f.toFixed() : maxtemp_c.toFixed()}&deg;
            </span>
          </div>
          <div className="flex items-center">
            <UilArrowDown />
            <span className="md:text-lg text-sm">
              Low: {clicked ? mintemp_f.toFixed() : mintemp_c.toFixed()}&deg;
            </span>
          </div>
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-white text-sm md:text-lg uppercase">
          Hourly forcast
        </h2>
        <hr />
        <div className="flex mt-2 md:gap-0 gap-2 flex-wrap justify-around items-center">
          {hourlyForecast &&
            hourlyForecast
              .slice(0, 5)
              .map(
                (
                  {temp_c, temp_f, time_epoch, condition: {text, icon}},
                  index
                ) => {
                  const date = new Date(time_epoch * 1000) // Convert the timestamp to milliseconds by multiplying it by 1000
                  const StringDate = date.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: tz_id,
                  })
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-evenly  items-center text-white">
                      <span className="text-sm">{StringDate}</span>
                      {icon !==
                      "//cdn.weatherapi.com/weather/64x64/night/113.png" ? (
                        <div className="w-8">
                          <img src={`http://${icon}`} alt="Weather Icon" />
                        </div>
                      ) : (
                        <UilMoon size={20} className="text-MainColor my-2" />
                      )}
                      <span className="text-sm">
                        {clicked ? temp_f.toFixed() : temp_c.toFixed()}&deg;
                      </span>
                      <span className="text-xs">{text}</span>
                    </div>
                  )
                }
              )}
        </div>
      </div>
      <div className="my-2 pb-4">
        <h2 className="text-white  text-sm md:text-lg uppercase">
          Daily forcast
        </h2>
        <hr />
        <div className="flex mt-2 justify-around flex-wrap gap-2 items-center">
          {dailyForecast &&
            dailyForecast.slice(0, 5).map(
              (
                {
                  date_epoch,
                  day: {
                    maxtemp_c,
                    maxtemp_f,
                    mintemp_c,
                    mintemp_f,
                    condition: {text, icon},
                  },
                },
                index
              ) => {
                const date = new Date(date_epoch * 1000) // Convert the timestamp to milliseconds by multiplying it by 1000
                const StringDate = date.toLocaleString("en-US", {
                  weekday: "long",
                  timeZone: tz_id,
                })
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-evenly items-center text-white">
                    <span className="text-sm">{StringDate}</span>
                    {icon !==
                    "//cdn.weatherapi.com/weather/64x64/night/113.png" ? (
                      <div className="w-8 h-  ">
                        <img src={`http://${icon}`} alt="Weather Icon" />
                      </div>
                    ) : (
                      <UilMoon size={30} className="text-MainColor" />
                    )}
                    <div className="flex gap-2">
                      <span className="text-sm">
                        {clicked ? maxtemp_f.toFixed() : maxtemp_c.toFixed()}
                        &deg;
                      </span>
                      <span className="text-sm text-gray-500">
                        {clicked ? mintemp_f.toFixed() : mintemp_c.toFixed()}
                        &deg;
                      </span>
                    </div>

                    <span className="text-xs">{text}</span>
                  </div>
                )
              }
            )}
        </div>
      </div>
    </div>
  )
}
