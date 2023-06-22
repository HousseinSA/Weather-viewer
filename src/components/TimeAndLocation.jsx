export const TimeAndLocation = ({time, timeZone, cityInfo}) => {
  const date = new Date(time * 1000)
  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: timeZone,
  })
  const {name, region, country} = cityInfo
  return (
    <div className="flex-col flex justify-center items-center">
      <div className="text-gray-600 md:text-lg text-md lg:text-xl my-2">
        {dateString}
      </div>
      <div className=" text-white lg:text-2xl md:text-xl text-lg text-bold mb-3 capitalize ">
        {`${name}, ${region}  ${country}`}
      </div>
    </div>
  )
}
