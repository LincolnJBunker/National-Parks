import EditProfileBtn from "../components/EditProfileBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import PostContainer from "../components/PostContainer";

function Profile() {
  const [info, setInfo] = useState([])
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
  // console.log('userId', userId)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [userPic, setUserPic] = useState('');

  ///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\

  const [userData, setUserData] = useState({
    username: null,
    bio: null,
    userPic: null,
    followers: null,
    following: null,

  })

  // David wrote the following block of code
  // const [followers, setFollowers] = useState([])
  // const [following, setFollowing] = useState([])
  
  const getUserData = async (id) => {
      console.log('getUserData', id)
      // get and set userData for given id
      let followRes = await axios.get(`/api/follows/${id}`)
      console.log('followRes', followRes)
      setUserData({...userData, followers: followRes.data.followers, following: followRes.data.following})
      let infoRes = await axios.post(`/api/userInfo`, {id})
      console.log('infoRes', infoRes)
      setUserData({...userData, username: infoRes.data.username, password: infoRes.data.password, bio: infoRes.data.bio, userPic: infoRes.data.userPic})

  }

  // const getFollows = (id=userId) => {
  //   axios.get(`/api/follows/${id}`).then(res =>{
  //     setFollowers(res.data.followers)
  //     setFollowing(res.data.following)
  //   })
  // }
  useEffect(() => {
    if (profileId || userId) {
      getUserData(profileId ? profileId : userId.userId)
    }
  }, [userId, profileId])
  // End of Code Block David wrote
  ///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\


  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>{JSON.stringify(userData)}</p>
      <p>profileId: {profileId} userId: {userId?.userId}</p>
      <img className="profile-pic" src={userData.userPic} alt="profile-pic" />
      <h3>Following: {userData.following?.length}</h3>
      <h3>Followers: {userData.followers?.length}</h3>
      <h3>{userData.username}</h3>
      <p>{userData.bio}</p>
      {(userId && !profileId || (userId===profileId)) && <EditProfileBtn />}

      <PostContainer mode='user' myId={profileId?profileId:userId?.userId} />
    </div>
  )
}

export default Profile