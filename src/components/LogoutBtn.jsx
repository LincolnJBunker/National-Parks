import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await axios.get('/api/logout')

        if (res.data.success) {
            dispatch({
                type: 'LOGOUT'
            })
            console.log(res.data)
            navigate('/')
        }
    }
  return (
    <div className="logout-btn">
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutBtn