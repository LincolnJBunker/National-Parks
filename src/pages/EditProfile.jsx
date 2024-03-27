import ConfirmDelete from "../components/ConfirmDelete.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [userPic, setUserPic] = useState('');
    const [info, setInfo] = useState([]);
    const dispatch = useDispatch();
    const sessionCheck = async () => {
        const res = await axios.get('/api/session-check')
        console.log(res)
        if (res.data.success) {

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
            console.log(res.data)
          })
      }

    useEffect(() => {
        sessionCheck()
        userInfoGet()
    }, [])

    const userId = useSelector((state) => state.userId);
    console.log(userId)


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

    const handleClose = () => {
        setShowModal(false);
    }

    const handleConfirm = () => {
        deleteUser()
        setShowModal(false)
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
        {info && (
            <div >
                <p>Username: {username}</p>
                <p>Password: {password}</p>
                <p>Bio: {bio}</p>
                Profile Pic:<img src={userPic} alt="profile pic" className="profile-pic" />
            </div>
        )}
            {/* <div className="confirmation-container">
                <div className="confirmation-text">
                    Do you really want to delete your account?
                </div>
                <div className="button-container">
                    <button className="cancel-button" onClick={() => handleConfirmationBox()}>
                        Cancel
                    </button>
                    <button className="confirmation-button" onClick={deleteUser}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="confirm-bg" onClick={() => handleConfirmationBox()}>
                <button>Delete</button>
            </div> */}
            <button onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete your profile?"
                )
                if (confirmBox === true) {
                    deleteUser()
                }
            }}>Delete Profile</button>
            {/* <button className="delete-button" onClick={() => setShowModal(true)}>Delete</button>
            <ConfirmDelete show={showModal} handleClose={handleClose} handleConfirm={handleConfirm} /> */}
            <button onClick={() => setIsEditing(true)}>edit</button>

    </div>
  )
}

export default EditProfile