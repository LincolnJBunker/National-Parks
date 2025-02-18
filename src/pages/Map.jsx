import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
// import googleAPIKey from "../hidden.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tree_img from '/tree2.png'

function Maps() {
  const [isMapInitialized, setMapInitialized] = useState(false);
  const [parkMarkers, setParkMarkers] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null)
  console.log(selectedPark)

  const startingPosition = { lat: 39.76 , lng: -101.61 };

  const navigate = useNavigate();
  
  useEffect(() => {
    //get the park markers
    axios.get('/api/parkMarkers')
      .then(res => {
        //set setParkMarkers to that data
        setParkMarkers(res.data)
        console.log(res.data)
      })
  }, [])
console.log(selectedPark)

const handleClick = async () => {
  navigate(`/park/${selectedPark.parkId}`)
}
  
  return (
    <>
    <div className="map-header">
      <h2>Map</h2>
      <p>Checkout all of the national parks below! Click on a marker to see the park, activities to 
        do there, and some pictures!
      </p>
    </div>
    <APIProvider apiKey={googleAPIKey} >
      <div className="google-map">
        <Map
          zoom={isMapInitialized ? undefined : 4}
          center={isMapInitialized ? undefined : startingPosition} 
          onIdle={() => setMapInitialized(true)}
          mapId="5d89cad2f935803d"
        >
          {parkMarkers.map(park => (
            <AdvancedMarker
            key={park.park_id}
            position={{ lat: park.latitude, lng: park.longitude }}
            onClick={() => setSelectedPark(park)}
            >
              <img src={tree_img} alt="Park" style={{ width: '30px', height: '30px' }} />

            </AdvancedMarker>
          ))}

          {selectedPark && (
            <InfoWindow 
              position={{lat: selectedPark.latitude, lng: selectedPark.longitude }} 
              onCloseClick={() => setSelectedPark(null)}
              >
                <div className="park-infowindow">
                  <div className="park-header">
                    <h2 style={{color: 'black'}}>{selectedPark.fullName}</h2>
                    <p style={{ color: 'black' }}>Popular Actvities in {selectedPark.fullName}</p>
                  </div>
                  <div className="marker-activities">
                    <ul>
                      {selectedPark.activities.map(activity => (
                        <li key={activity.activity_id} style={{ color: 'black' }}>{activity.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="visit-park">
                    <h4>Interested in more information?</h4>
                    <button className='visit' onClick={handleClick}>Visit {selectedPark.fullName}</button>
                  </div>
                  <div className="marker-images">
                        <Carousel controls indicators>
                            {selectedPark.images.map(image => (
                          <Carousel.Item>
                              <img src={image} alt="park image" className="carousel-image"/>
                          </Carousel.Item>
                        ))}
                        </Carousel>
                  </div>
                </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>

    </>
  )
}

export default Maps