import axios from "axios"
import React from "react"
import { useLoaderData } from "react-router-dom"
// import { Carousel } from "react-bootstrap"

function ParkProfile() {

    // const { parkId } = useParams()
    const park = useLoaderData()
    console.log(park)

//map through the actvities and then pass in under the description. Then map over posts
const parkActivity = park.activities.map((activity) => <p>{activity.name}</p>)
const parkPost = park.posts.map((post) => <ul>{post.name}</ul>)

  return (
    <div className="park-profile">
            <h2 className="park-name">{park.fullName}</h2>
    <img className="park-pic" src={park.images[2]} />
    <p className="description">{park.description}</p>
    <div>
        <p>Located in: {park.states}</p>
        <p>Longitude: {park.longitude}</p>
        <p>Latitude: {park.latitude}</p>
    </div>
    <div className="prof-activity">{parkActivity}</div>
    <div className="prof-post">{parkPost}</div>
    </div>
  )
}

export default ParkProfile


export const parkProfileLoader = async ({ params }) => {
    const res = await axios.get(`/api/park/${params.parkId}`)
    
    return res.data
}