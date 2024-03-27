import EditProfileBtn from "../components/EditProfileBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import PostContainer from "../components/PostContainer";

function Profile() {
  const dispatch = useDispatch();
  const sessionCheck = async () => {
      const res = await axios.get('/api/session-check')
      console.log(res.data)
      if (res.data.success) {
          console.log(res.data)
          console.log('res success')
          setUsername(res.data.username)
          setPassword(res.data.password)
          setBio(res.data.bio)
          setUserPic(res.data.userPic)
          dispatch({
              type: 'USER_AUTH',
              payload: {
                  userId: res.data.userId,
                  username: res.data.username,
                  password: res.data.password,
                  bio: res.data.bio,
                  userPic: res.data.userPic
              }
          });
      };
  };


  

  useEffect(() => {
      sessionCheck()
  }, [])

  const userId = useSelector((state) => state.userId);
  const profileId = useSelector((state) => state.profileId);
  console.log('userId', userId)

  const [isFollowing, setIsFollowing] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [userData, setUserData] = useState({
    username: null,
    password: null,
    bio: null,
    userPic: null,
    followers: null,
    following: null,

  })

  const getUserData = async (id) => {
      console.log('getUserData', id)
      let followRes = await axios.get(`/api/follows/${id}`)
      // console.log('followRes', followRes, followRes.data.followers)
      let infoRes = await axios.post(`/api/userInfo`, {id})
      // console.log('infoRes', infoRes)
      setUserData({
        ...userData,
        username: infoRes.data.username,
        password: infoRes.data.password,
        bio: infoRes.data.bio,
        userPic: infoRes.data.userPic,
        followers: followRes.data.followers,
        following: followRes.data.following,
      })

      setIsFollowing(followRes.data.followers.find(f=>f.followerId===userId.userId && f.isFollowing)?true:false)
      console.log('userData', userData)
  }

  const handleFollow = () => {
    if (!userId?.userId || !profileId) {
      return
    }
    axios.post('/api/followUser', {userId: userId.userId, profileId}).then(res =>{
      getUserData(profileId)
    })
  }

  const handleUnfollow = () => {
    if (!userId?.userId || !profileId) {
      return
    }
    axios.put('/api/unfollowUser', {userId: userId.userId, profileId}).then(res =>{
      getUserData(profileId)
    })
  }
  useEffect(() => {
    if (profileId || userId) {
      getUserData(profileId ? profileId : userId.userId)
    }
    setShowFollowing(userId?.userId && profileId && userId?.userId!==profileId)
  }, [userId, profileId])

  useEffect(() => {

  })
  const followingRender = showFollowing && isFollowing ? (
    <>
      <h4>Following</h4>
      <button onClick={handleUnfollow}>unFollow</button>
    </>
  ) : (
    <button onClick={handleFollow}>Follow</button>
  )

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>following? {String(isFollowing)}</p>
      <p>{JSON.stringify(userData)}</p>
      <p>map {JSON.stringify(userData.followers?.map(f => f.followerId))}</p>
      <p>profileId: {profileId} userId: {userId?.userId}</p>
      <img className="profile-pic" src={userData.userPic} alt="profile-pic" />
      <h3>Following: {userData.following?.length}</h3>
      <h3>Followers: {userData.followers?.length}</h3>
      <h3>{userData.username}</h3>
      <p>{userData.bio}</p>
      {(userId && !profileId || (userId===profileId)) && <EditProfileBtn />}
      {followingRender}
      <PostContainer mode='user' myId={profileId?profileId:userId?.userId} />
    </div>
  )
}

export default Profile