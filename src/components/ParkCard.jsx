import { useNavigate } from "react-router-dom"

function ParkCard({ park }) {
  const navigate = useNavigate()

const handleClick = async () => {
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