import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { accessKeyId, secretAccessKey, region} from '../../src/hidden.js'
import ReactS3 from 'react-s3'
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';

const config = {
    bucketName: 'national-parks-dev-mtn',
    dirName: 'photos',
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
}

function EditProfile() {
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [userPic, setUserPic] = useState('');
    const [info, setInfo] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState('')
    const [submissionStatus, setSubmissionStatus] = useState()
    const [imgUploadStatus, setImgUploadStatus] = useState('');

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
            // console.log(res.data)
          })
      }

    useEffect(() => {
        sessionCheck()
        userInfoGet()
    }, [])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.1083.0.min.js";
        script.async = true;
        script.onload = () => {
          window.AWS.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
          });
        };
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [accessKeyId, secretAccessKey, region]);

      const handleChange = (e, type) => {
        if (e.target.name === "theimage") {
          const file = e.target.files[0];
          if (file) {
            uploadFile(file)
          }
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };

      function uploadFile(file, type) {
        const s3 = new window.AWS.S3();
        const keyPrefix = "user-profiles/"
        const params = {
            Bucket: "national-parks-dev-mtn",
            Key: `${keyPrefix}${file.name}`,
            Body: file,
          };
    
          s3.upload(params, async (err, data) => {
            if (err) {
              console.error("Error uploading file:", err);
              setImgUploadStatus(`Failed to upload ${type} image.`);
            } else {
              console.log(`File uploaded successfully. ${data.Location}`);
              try {
                const updateEndpoint =
                  type === "profile"
                    ? `/updateUserProfileImg/${userId}`
                    : `/updateUserHeaderImg/${userId}`
                await axios.put(updateEndpoint, {
                  [type === "profile" ? "imgUrl" : "headerImgUrl"]: data.Location,
                });
                setReload(!reload); // Trigger reload to fetch updated user info
              } catch (error) {
                console.error(`Error updating ${type} profile image:`, error);
                setImgUploadStatus(`Failed to update ${type} profile image.`);
              }
            }
          });
      }
    
    const upload = (e) => {
        console.log(e.target.files[0])
        uploadFile(e.target.files[0] , config)
        .then( (data) => {
            console.log(data)
        })
        .catch( (err) => {
            alert(err)
        })
    }
    const userId = useSelector((state) => state.userId);

    const navigate = useNavigate();

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

    const handleSave = async (e) => {
        const bodyObj = {
            username,
            password,
            bio,
            userPic
        };
        console.log(bodyObj)
        console.log(bodyObj.userPic)
    
        // if (selectedFile) {
        //     console.log(selectedFile)
        //     const formData = new FormData();
        //     console.log(formData)
        //     formData.append('userPic', selectedFile);

        //     try {
        //         const res = await axios.post('/api/upload', formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         });
        //         setUserPic(res.data.imageUrl);
        //         console.log(res.data.imageUrl)
        //     } catch (error) {
        //         console.log("errorrrrr uploading profile pic", error)
        //     }
        // }
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
        setShow(false);
    }

    const handleShow = () => {
        setShow(true)
    }

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0])
    // }

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
            type="file"
            onChange={upload}
            // type="text"
            // value={userPic}
            // onChange={(e) => setUserPic(e.target.value)}
            // placeholder="Insert new pic"
            // type="file"
            // name="theimage"
            // id="fileUpload"
            // onChange={handleChange}
            />
            <label htmlFor="Image">Image test</label>
            {info?.headerImgUrl && (
          <img
            src={info.imgUrl}
            alt="profile-pic"
            className="profile-pic"
            onClick={() => document.getElementById("fileUpload").click()}
          />
        )}

            <button onClick={handleSave}>Save</button>
        </div>
  ) : (
    <div>
        {info && (
            <div >
                <p>Username: {username}</p>
                <p>Password: {password}</p>
                <p>Bio: {bio}</p>
                Profile Pic:<img src={userPic} alt="profile-pic" className="profile-pic" />
            </div>
        )}
            <button style={{color: 'red'}} className="delete-button" onClick={handleShow}>Delete Profile</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    You sure you tryna delete yo account ??
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                    <button onClick={deleteUser}>Yes, Delete</button>
                </Modal.Footer>
            </Modal>
            <button onClick={() => setIsEditing(true)}>edit</button>

    </div>
  )
}

export default EditProfile