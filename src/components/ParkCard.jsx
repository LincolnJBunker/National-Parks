import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

function ParkCard({ park }) {
  // const parkId = useSelector((state) => state.parkId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleClick = async () => {
    // dispatch({
    //   type: "SET_PARK",
    //   payload: park.parkId
    // })
    navigate(`/park/${park.parkId}`)
}

return (
  <>
    <div className="park-card" onClick={handleClick}>
        <img className="park-img" src={park.images[0]} alt={park.fullName} />
        <p className="park-name">{park.fullName}</p>
      </div>
    </>
  )
  
}
export default ParkCard