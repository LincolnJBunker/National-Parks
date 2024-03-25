import EditProfileBtn from "../components/EditProfileBtn";
import { useSelector } from "react-redux";

function Profile() {
  const userId = useSelector((state) => state.userId);
  console.log(userId)
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <img className="profile-pic" src={userId.userPic} alt="profile-pic" />
      <h3>{userId.username}</h3>
      <p>{userId.bio}</p>
      <EditProfileBtn />
    </div>
  )
}

export default Profile