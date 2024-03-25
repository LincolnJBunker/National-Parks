import { useSelector, useDispatch } from "react-redux"
import React from "react"
import PostContainer from "../components/PostContainer"


function Home() {


  const dispatch = useDispatch()
  const profileId = useSelector(state => state.profileId)
  const userId = useSelector(state => state.userId?.userId)
  console.log('startUser', userId, 'endUser')


  
  return (
    <div className="home-page">
      <h4>Home</h4>
      <PostContainer mode='user' myId={1}/>
    </div>
  )
}

export default Home