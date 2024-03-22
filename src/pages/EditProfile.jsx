import LogoutBtn from "../components/LogoutBtn";
import { useState } from "react";
import axios from "axios";

function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [info, setInfo] = useState([]);

    const getInfo = (e) => {
        e.preventDefault();

        axios.post('/api/userInfo', {
            userId
        })
        .then((res) => {
            console.log(res.data)
            setInfo(res.data)
        })
    }

    const handleSave = () => {
        const bodyObj = {
            username,
            password
        }
    }
  return (
    <div>
        <LogoutBtn />
    </div>
  )
}

export default EditProfile