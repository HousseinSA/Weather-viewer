import {createContext, useContext, useState} from "react"
const MyContext = createContext()
export const MyContextProvider = ({children}) => {
  const [city, setCity] = useState("")
  const handelSubmit = (e) => {
    e.preventDefault()
    setCity(e.target.city.value)
    e.target.rest()
  }
  const value = {city, setCity, handelSubmit}
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
export const AppContext = () => {
  return useContext(MyContext)
}
