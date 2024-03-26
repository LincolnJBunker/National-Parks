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
  console.log(userId)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [userPic, setUserPic] = useState('');

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <img className="profile-pic" src={userPic} alt="profile-pic" />
      <h3>Following: {}</h3>
      <h3>Followers: {}</h3>
      <h3>{username}</h3>
      <p>{bio}</p>
      <EditProfileBtn />

      <PostContainer mode='user' myId={userId.userId} />
    </div>
  )
}

export default Profile