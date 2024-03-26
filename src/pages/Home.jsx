import { useSelector, useDispatch } from "react-redux"
import React from "react"
import PostContainer from "../components/PostContainer"
import axios from "axios"
import { useLoaderData } from "react-router-dom"


function Home() {

  const profile = useLoaderData()
  console.log(profile)
  const dispatch = useDispatch()
  const profileId = useSelector(state => state.profileId)
  const userId = useSelector(state => state.userId?.userId)
  console.log('startUser', userId, 'endUser')


  
  return (
    <div className="home-page">
      <h4>Home</h4>
      <PostContainer mode='park' myId={61}/>
    </div>
  )
}

export default Home

export const profileLoader = async ({ params }) => {
  const res = await axios.get(`/api/profile/${params.profileId}`)
  return res.data
}