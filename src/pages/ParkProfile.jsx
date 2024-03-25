import axios from "axios"
import React from "react"
import { useLoaderData } from "react-router-dom"
import PostCard from "../components/PostCard"
// import { Carousel } from "react-bootstrap"

function ParkProfile() {

    // const { parkId } = useParams()
    const park = useLoaderData()
    console.log(park.posts)

//map through the actvities and then pass in under the description. Then map over posts
const parkActivity = park.activities.map((activity) => <p className="activity">{activity.name}</p>)
const parkPosts = park.posts.map((post) => <PostCard 
  postPic={post.postPic}
  postText={post.postText}
  username={post.user.username}
  profileId={post.user.userId}
  comments={post.comments}
  activities={post.activities}
  key={post.postId} 
  />
  )

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
    <h3>Popular Activities:</h3>
    <div className="prof-activity">{parkActivity}</div>
    <h3>Posts:</h3>
    <div className="prof-post">{parkPosts}</div>
    </div>
  )
}

export default ParkProfile


export const parkProfileLoader = async ({ params }) => {
    const res = await axios.get(`/api/park/${params.parkId}`)
    
    return res.data
}