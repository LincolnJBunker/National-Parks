import axios from "axios"
import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"

function ParkProfile() {

    // const { parkId } = useParams()
    const park = useLoaderData()
    console.log(park)


//map through the actvities and then pass in under the description. Then map over posts

  return (
    <div className="park-profile">
            <h2 className="park-name">{park.fullName}</h2>
    <img className="park-pic" src={park.images[2]} />
    <p>{park.description}</p>
    {/* <p>{park.activities}</p> */}
    <h3>Posts down here</h3>
    </div>
  )
}

export default ParkProfile


export const parkProfileLoader = async ({ params }) => {
    const res = await axios.get(`/api/park/${params.parkId}`)
    
    return res.data
}