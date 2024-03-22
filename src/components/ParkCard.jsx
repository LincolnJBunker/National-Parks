import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function ParkCard({ park }) {
  const parkId = useSelector((state) => state.parkId)

const handleClick = async () => {
const dispatch = useDispatch()
const navigate = useNavigate()

  if (parkId) {
    dispatch({
      type: "SET_PARK",
      payload: parkId
    })
    navigate(`/park-profile/${parkId}`)
  } else {
    navigate("/home")
  }
}

return (
  <>
    <div className="park-card" onClick={handleClick}>
    <img className="park-img" src={park.images[0]} />
            <p className="park-name">{park.fullName}</p>
        
    </div>
    </>
  )
  
}
export default ParkCard