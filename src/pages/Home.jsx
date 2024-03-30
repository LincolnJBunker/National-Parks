import { useSelector } from "react-redux"
import React from "react"
import PostContainer from "../components/PostContainer"

import { useState, useEffect } from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"


function Home() {

  const { parks, profile, activities } = useLoaderData()
  console.log(profile)

  // const dispatch = useDispatch()
  // const profileId = useSelector(state => state.profileId)
  const userId = useSelector(state => state.userId?.userId)
  // console.log('startUser', userId, 'endUser')
  
  const [postText, setPostText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [posts, setPosts] = useState([])
  const [postPic, setPostPic] = useState("")
  const [secondPic, setSecondPic] = useState("")
  const [thirdPic, setThirdPic] = useState("")
  const [parkValue, setParkValue] = useState("")
  const [activityVal, setActivityVal] = useState("")
  const [changed, setChanged] = useState(false)

  const editMode = () => setIsEditing(true)

  let userPosts = async () => {
    axios.post("/api/posts", {myId: userId, mode: 'friends'})
    .then((res) => {
      console.log('data', res.data)
      setPosts(res.data.posts)
  })
  }

  const handleSave = async () => {
    const bodyObj = {
      postPic,
      secondPic, 
      thirdPic,
      postText,
      parkId: parkValue,
      activityId: activityVal
    }
    
    axios.post("/api/addPost", bodyObj)
    .then((res) => {
      console.log('post endpoint success')
      userPosts()
      setIsEditing(false)
      setChanged(!changed)
      setPostText("")
    })
  }

  const handleCancel = async () => {
    setPostPic(postPic);
    setPostText(postText);
    setIsEditing(false)
  }

  useEffect(() => {userPosts()}, [userId])

  return (
    <div className="home-page">
      <h4>Home</h4>
      <p></p>
      <button onClick={editMode}>Add Post</button>
      {isEditing &&
            <>
            <div className="add-post">
              <div>
                <input 
                  className="pic-input"
                  value={postPic} 
                  type="text" 
                  placeholder="+" 
                  onChange={(e) => setPostPic(e.target.value)} /> 
                <input 
                  className="pic-input"
                  value={secondPic} 
                  type="text" 
                  placeholder="+" 
                  onChange={(e) => setSecondPic(e.target.value)} /> 
                <input 
                  className="pic-input"
                  value={thirdPic} 
                  type="text" 
                  placeholder="+" 
                  onChange={(e) => setThirdPic(e.target.value)} /> 
              </div>
              <textarea className="post-text" value={postText} placeholder="Speak your thoughts!" onChange={(e) => setPostText(e.target.value)} />
              <div>
                <select className="select" id="park-opt" onChange={(e) => setParkValue(e.target.value)}>
                  <option>Pick a Park</option>
                {parks.map((park) => (
                  <option key={park.parkId} value={park.parkId}>{park.fullName}</option>
                ))}
                </select>
                <select className="select" id="park-opt" onChange={(e) => setActivityVal(e.target.value)}>
                  <option>Pick an Activity</option>
                {activities.map((activity) => (
                  <option key={activity.activityId} value={activity.activityId}>{activity.name}</option>
                ))}
                </select>
              </div>
                <button className="img-btn" onClick={handleSave}>Save</button>
                <button className="img-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </>
            }
      <PostContainer changed={changed} mode='friends' myId={userId}/>
    </div>
  )
}

export default Home

export const profileLoader = async ({ params }) => {
  const res = await axios.get(`/api/profile/${params.profileId}`)
  const parks = await axios.get("/allParks")
  const activities = await axios.get("/allActivities")

  return { parks: parks.data, res: res.data, activities: activities.data }
  //does "res" need to be "profile"?
}