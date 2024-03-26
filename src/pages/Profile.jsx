import EditProfileBtn from "../components/EditProfileBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

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
  console.log('userId', userId)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [userPic, setUserPic] = useState('');

  ///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\
  // David wrote the following block of code
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const getFollows = (id=userId) => {
    axios.get(`/api/follows/${id}`).then(res =>{
      setFollowers(res.data.followers)
      setFollowing(res.data.following)
    })
  }
  useEffect(() => {
    if (userId)
    getFollows(userId.userId)
  }, [userId])
  // End of Code Block David wrote
  ///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\


  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <img className="profile-pic" src={userPic} alt="profile-pic" />
      <h3>Following: {following?.length}</h3>
      <h3>Followers: {followers?.length}</h3>
      <h3>{username}</h3>
      <p>{bio}</p>
      <EditProfileBtn />
    </div>
  )
}

export default Profile