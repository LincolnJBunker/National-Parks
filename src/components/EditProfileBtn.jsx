import { useNavigate } from "react-router-dom";

function EditProfileBtn() {
    const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate('/edit')}>Edit Profile</button>
    </div>
  )
}

export default EditProfileBtn