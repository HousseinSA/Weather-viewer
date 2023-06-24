import {createContext, useContext, useEffect, useState} from "react"
const MyContext = createContext()
export const MyContextProvider = ({children}) => {
  const [city, setCity] = useState("")
  const handelSubmit = (e) => {
    e.preventDefault()
    setCity(e.target.city.value)
  }

  const handelUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((postion) => {
        let lat = postion.coords.latitude
        let lon = postion.coords.longitude
        setCity(`${lat},${lon}`)
      })
    }
  }

  useEffect(() => {
    handelUserLocation()
  }, [])
  const value = {
    city,
    setCity,
    handelSubmit,
    handelUserLocation,
  }
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
export const AppContext = () => {
  return useContext(MyContext)
}
