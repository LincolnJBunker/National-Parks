import ParkCard from "../components/ParkCard"
import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import ParkProfile from "./ParkProfile"
import { useLoaderData } from "react-router-dom"

function Parks() {
  // const [parks, setParks] = useState([])
  // const [activities, setActivities] = useState([])
  const [searchVal, setSearchVal] = useState("")
  const [activityVal, setActivityVal] = useState("")

  const { parks, activities } = useLoaderData()

  const parkId = useSelector((state) => state.parkId)
  console.log(parkId)

  // let cards = async () => {axios.get("/allParks")
  //   .then((res) => {
  //       setParks(res.data)
  //   })
  // }

  // function to take the current 'parks' array and filter it based on the 'searchVal'
  const filteredParks = parks.filter((park) => {


    const parkNameMatch = park.fullName.toLowerCase().includes(searchVal.trim().toLowerCase());
    const activityMatch = activityVal !== "" ? park.activities.some(activity => activity.name.toLowerCase().includes(activityVal.trim().toLowerCase())) : true;
    return parkNameMatch && activityMatch; // Add condition to check if park.activities exists
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const parksResponse = await axios.get("/allParks")
  //       setParks(parksResponse.data)
        
  //       const activitiesResponse = await axios.get("/allActivities")
  //       setActivities(activitiesResponse.data)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const onePark = parks.filter((park) => park.parkId === parkId)[0]
  console.log(onePark)

  // useEffect(() => {cards()}, [])

  const myContent = filteredParks.map((park) => {
    return <ParkCard park={park} key={park.parkId} />
  })
  // console.log(filteredParks, activityVal)

  return (!parkId ? (
    <>
        <label htmlFor="where-to">Where to?</label>
        <input  
          style={{width: "200px"}} 
          name="where-to" 
          id="where-to" 
          type="text" 
          placeholder="Enter a destination..." 
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
   <select className="select" id="activity" onChange={(e) => setActivityVal(e.target.value)}>
            <option>Pick an Activity</option>
            {activities.map((activity) => (
                <option key={activity.activityId} value={activity.name}>{activity.name}</option>
            ))}
        </select>
    <div className="parks-page">
        {myContent}
      </div>
      </>
  ) : (
    <ParkProfile park={onePark} />
  ))
  }

export default Parks



export const parksLoader = async () => {
  const parks = await axios.get("/allParks")
  const activities = await axios.get("/allActivities")

  return { parks: parks.data, activities: activities.data }
}