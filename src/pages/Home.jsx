import { useSelector, useDispatch } from "react-redux"
import React from "react"
import PostContainer from "../components/PostContainer"

import { useState, useEffect } from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"


function Home() {

  const profile = useLoaderData()
  console.log(profile)

  const dispatch = useDispatch()
  const profileId = useSelector(state => state.profileId)
  const userId = useSelector(state => state.userId?.userId)
  // console.log('startUser', userId, 'endUser')
  
  const [postPic, setPostPic] = useState("")
    const [postText, setPostText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [posts, setPosts] = useState([])

  console.log(posts)

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

  useEffect(() => {userPosts()}, [])

  return (
    <div className="home-page">
      <h4>Home</h4>

      <button onClick={editMode}>Add Post</button>
      {isEditing &&
            <>
            <input value={postPic} placeholder="Name" onChange={(e) => setPostPic(e.target.value)} /> 
            <textarea value={postText} placeholder="Speak your thoughts!" onChange={(e) => setPostText(e.target.value)} />
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
  return res.data
}