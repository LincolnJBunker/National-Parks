import LogoutBtn from "../components/LogoutBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const userId = useSelector((state) => state.userId);
    
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userId.username);
    const [password, setPassword] = useState(userId.password);
    const [bio, setBio] = useState(userId.bio);
    const [userPic, setUserPic] = useState(userId.userPic);
    const [info, setInfo] = useState([]);

    const navigate = useNavigate();

    console.log(userId)

    const getInfo = (e) => {
        e.preventDefault();

        axios.post('/api/userInfo', {
            userId: userId
        })
        .then((res) => {
            console.log(res.data)
            setInfo(res.data)
        })
    }

    const handleSave = () => {
        console.log( 'userId:', userId)
        const bodyObj = {
            username,
            password,
            bio,
            userPic
        };
        console.log(bodyObj)

        axios.put(`/api/user/update/${userId.userId}`, bodyObj)
            .then((res) => {
                setIsEditing(false)
            })
    }

    const deleteUser = async () => {
        console.log(userId)
        axios.delete(`/api/user/delete/${userId.userId}`)
        navigate('/')
    }

  return isEditing ? (
        <div >
            <p>Username:</p>
            <input 
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             placeholder="Enter new username"
            />
            <p>Password:</p>
            <input 
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            />
            <p>Bio:</p>
            <input 
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter new bio"
            />
            <p>Profile Pic:</p>            
            <input 
            type="text"
            value={userPic}
            onChange={(e) => setUserPic(e.target.value)}
            placeholder="Insert new pic"
            />

            <button onClick={handleSave}>Save</button>
        </div>
  ) : (
    <div>
        <LogoutBtn />
        <button onClick={getInfo}></button>
        {info && (
            <div >
                <p>Username: {info.username}</p>
                <p>Password: {info.password}</p>
                <p>Bio: {info.bio}</p>
                Profile Pic:<img src={info.userPic} alt="profile pic" />
            </div>
        )}
        <td>
            <button onClick={() => setIsEditing(true)}>edit</button>
            <button onClick={deleteUser}>delete account</button>
        </td>
    </div>
  )
}

export default EditProfile