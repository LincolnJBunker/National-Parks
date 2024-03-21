function ParkProfile({ park }) {

//needs all the park data rendered and then styled. Then the posts underneath

  return (
    <div className="park-card">
            <h2 className="park-name">{park.fullName}</h2>
    <img className="park-img" src={park.images[1]} />
    <p>{park.description}</p>
        
    </div>
  )
}

export default ParkProfile