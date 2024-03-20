import ParkCard from "../components/ParkCard"
import { useEffect, useState } from "react"
import axios from "axios"

function Parks() {
  const [parks, setParks] = useState([])

  let cards = async () => {axios.get("/allParks")
    .then((res) => {
        console.log(res.data)
        setParks(res.data.data)
    })
    }

    useEffect(() => {cards()}, [])

    const myContent = parks.map((park) => {
      <ParkCard park={park} key={park.parkId} />
    })


  return (
    <>
    <div className="parks-page">
      <label htmlFor="where-to">Where to?</label>
        <input style={{width: "200px"}} name="where-to" id="where-to" type="text" placeholder="Enter a destination..." />
        <label htmlFor="where-to">Activities:</label>
        <input style={{width: "200px"}} name="activities" id="activities" type="text" placeholder="I'd like to try..." />
        {myContent}
      </div>
      </>
  )
}

export default Parks