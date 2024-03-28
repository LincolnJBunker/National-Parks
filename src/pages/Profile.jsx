import EditProfileBtn from "../components/EditProfileBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import PostContainer from "../components/PostContainer";
import LogoutBtn from "../components/LogoutBtn";

function Profile() {
  const [info, setInfo] = useState([])
  const dispatch = useDispatch();
  const sessionCheck = async () => {
      const res = await axios.get('/api/session-check')
      if (res.data.success) {
          // setUsername(res.data.username)
          // setPassword(res.data.password)
          // setBio(res.data.bio)
          // setUserPic(res.data.userPic)
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

  let userInfoGet = async () => {
    axios.get('/api/userInfo')
      .then((res) => {
        setInfo(res.data)
      })
  }
  

  useEffect(() => {
      sessionCheck()
      userInfoGet()
  }, [])

  const userId = useSelector((state) => state.userId);
  const profileId = useSelector((state) => state.profileId);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [userPic, setUserPic] = useState('');

  ///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\

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
      let followRes = await axios.get(`/api/follows/${id}`)
      let infoRes = await axios.post(`/api/userInfo`, {id})
      setUserData({
        ...userData,
        username: infoRes.data.username,
        password: infoRes.data.password,
        bio: infoRes.data.bio,
        userPic: infoRes.data.userPic,
        followers: followRes.data.followers,
        following: followRes.data.following,
      })

      setIsFollowing(followRes.data.followers.find(f=>f.followerId===userId.userId)?true:false)
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
    setShowFollowing(userId?.userId && profileId && userId?.userId !== profileId)
  }, [userId, profileId])

  const followingRender = (showFollowing && (isFollowing ? (
    <>
      <h4>Following</h4>
      <button onClick={handleUnfollow}>Unfollow</button>
    </>
  ) : (
    <button onClick={handleFollow}>Follow</button>
  )))

  return (
    <div className="profile-page">
      <div className="data-container">
        <div className="pic-container">
          <img className="profile-pic" src={userData.userPic} alt="profile-pic" />
        </div>
      <div className="name-bio">
        <h3>{userData.username}</h3>
        <p>{userData.bio}</p>
      </div>
        <div className="follower-following-container">
          <div className="following">
            <h3>Following: {userData.following?.length}</h3> 
          </div>
          <div className="followers">
            <h3>Followers: {userData.followers?.length}</h3>
          </div>
          <div className="profile-buttons">
            {!showFollowing && <EditProfileBtn />}
            {!showFollowing && <LogoutBtn />}
          </div>
        </div>
      </div>
       {followingRender}
      <PostContainer mode='user' myId={profileId?profileId:userId?.userId} />
    </div>
  )
}

export default Profile