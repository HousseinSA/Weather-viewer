import Logo from "../assests/weather-viewer-high-resolution-logo-color-on-transparent-background.png"
import {AppContext} from "../context/AppContext"

export const TopButtons = () => {
  const {setCity} = AppContext()

  const cities = [
    {id: 1, name: "London"},
    {id: 2, name: "Tokyo"},
    {id: 3, name: "New York"},
    {id: 4, name: "Paris"},
    {id: 5, name: "Moscow"},
  ]
  return (
    <div className="flex px-3 w-full items-center justify-between">
      <div className=" w-16 md:w-20 py-2 md:mx-4">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="hidden flex-grow justify-end mx-10 md:flex gap-4 py-5">
        {cities.map((city) => {
          return (
            <button
              className="text-white md:text-lg"
              onClick={() => setCity(city.name)}
              key={city.id}>
              {city.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
