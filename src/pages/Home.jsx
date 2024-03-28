import { useSelector } from "react-redux"
import React from "react"
import PostContainer from "../components/PostContainer"

import { useState, useEffect } from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"


function Home() {

  const { parks, profile } = useLoaderData()
  console.log(profile)

  // const dispatch = useDispatch()
  // const profileId = useSelector(state => state.profileId)
  const userId = useSelector(state => state.userId?.userId)
  // console.log('startUser', userId, 'endUser')
  
  const [postPic, setPostPic] = useState("")
    const [postText, setPostText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [posts, setPosts] = useState([])
  const [parkValue, setParkValue] = useState("")

  const editMode = () => setIsEditing(true)

  let userPosts = async () => {axios.post("/api/posts", {myId: userId, mode: 'friends'})
  .then((res) => {
    console.log('data', res.data)
      setPosts(res.data.posts)
  })
  }

  const handleSave = async () => {
    const bodyObj = {
      postPic,
      postText,
      parkId: parkValue
    }
    
    axios.post("/api/addPost", bodyObj)
    .then((res) => {
      console.log('post endpoint success')
      userPosts()
      setIsEditing(false)
    })
  }

  const handleCancel = async () => {
    setPostPic(postPic),
    setPostText(postText),
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
            <input value={postPic} placeholder="Name" onChange={(e) => setPostPic(e.target.value)} /> 
            <textarea value={postText} placeholder="Speak your thoughts!" onChange={(e) => setPostText(e.target.value)} />
            <select className="select" id="park-opt" onChange={(e) => setParkValue(e.target.value)}>
            <option>Pick a Park</option>
            {parks.map((park) => (
              <option key={park.parkId} value={park.parkId}>{park.fullName}</option>
              ))}
            </select>
              <button className="img-btn" onClick={handleSave}>Save</button>
              <button className="img-btn" onClick={handleCancel}>Cancel</button>
            </>
            }
      <PostContainer mode='friends' myId={userId}/>
    </div>
  )
}

export default Home

export const profileLoader = async ({ params }) => {
  const res = await axios.get(`/api/profile/${params.profileId}`)
  const parks = await axios.get("/allParks")

  return { parks: parks.data, res: res.data }
}