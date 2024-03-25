import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function EditProfileBtn() {
    const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate('/edit')}>Edit Profile</button>
    </div>
  )
}

export default EditProfileBtn