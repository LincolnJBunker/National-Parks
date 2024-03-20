function ParkCard({ park }) {

  return (
    <>
    <div className="park-card">
    <img className="park-img" />
        <p className="park-name">{park.fullName}</p>
    </div>
    </>
  )
}

export default ParkCard