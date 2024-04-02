import axios from "axios"
import {useEffect, useState} from "react"
import { useLoaderData } from "react-router-dom"
import PostCard from "../components/PostCard"
import { Carousel } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux'


function ParkProfile() {

    // const { parkId } = useParams()
    const park = useLoaderData()
    const userId = useSelector((state) => state.userId);
    const [posts, setPosts] = useState(park.posts)
    const [following, setFollowing] = useState(park.posts)

    useEffect(_ => {
      axios.get(`/api/follows/${userId.userId}`).then(res=>{
        console.log('follow res', res)
        setFollowing(res.data.following)
      })
    }, [userId])

    const fetchPosts = () => {
      axios.post('/api/posts', {mode:'park', myId: park.parkId})
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          setPosts(res.data.posts)
        }
      }).catch(err=>console.log(err))
  }

//map through the actvities and then pass in under the description. Then map over posts

const parkActivity = park.activities.map((activity, idx) => <p key={idx} className="activity">{activity.name}</p>)
const parkPosts = park.posts.map((post) => <PostCard 
  userPic={post.user.userPic}
  postPic={post.postPic}
  secondPic={post.secondPic}
  thirdPic={post.thirdPic}
  postText={post.postText}
  username={post.user.username}
  profileId={post.user.userId}
  comments={post.comments}
  activities={post.activities}
  parkName={park.fullName}
  parkId={park.parkId}
  showUser={true}
  key={post.postId} 
  fetchPosts={fetchPosts}
  following={following}
  setFollowing={setFollowing}
  postId={post.postId}
  />
  )

  return (
    <div className="park-profile">
            <h2 className="park-name">{park.fullName}</h2>
            <div>
              <Carousel controls indicators>
                {park.images.map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <img className="carousel-image" src={image} alt={`Image ${idx}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
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