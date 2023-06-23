import {UilSearch, UilLocationPoint} from "@iconscout/react-unicons"
import {X} from "react-bootstrap-icons"
import {AppContext} from "../context/AppContext"
import {useState} from "react"
export const Input = () => {
  const [showX, setShowX] = useState("")
  const {handelSubmit, handelUserLocation} = AppContext()
  const removeText = () => {
    if (showX) {
      setShowX("")
    }
  }

  return (
    <div className="fleIx justify-center gap-4 items-center my-1 ">
      <form onSubmit={handelSubmit} className="flex gap-2">
        <div className="relative">
          <input
            type="text"
            name="city"
            value={showX}
            onChange={(e) => setShowX(e.target.value)}
            placeholder="Search city..."
            className="py-1 px-2 w-60 capitalize text-sm rounded focus:outline-none"
          />
          <div
            className="absolute top-1 text-xl cursor-pointer transition hover:scale-125 right-1"
            onClick={removeText}>
            {showX && <X />}
          </div>
        </div>
        <button type="submit">
          <UilSearch
            color={"white"}
            size={20}
            className="cursor-pointer transition active:scale-100 hover:scale-125"
          />
        </button>
        <UilLocationPoint
          color={"white"}
          size={20}
          onClick={handelUserLocation}
          className="cursor-pointer transition hover:scale-125"
        />
      </form>
    </div>
  )
}
