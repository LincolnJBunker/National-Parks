import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import googleAPIKey from "../hidden.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Maps() {
  const [isMapInitialized, setMapInitialized] = useState(false);
  const [parkMarkers, setParkMarkers] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null)

  const startingPosition = { lat: 37.29 , lng: -112.99 };

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
    <APIProvider apiKey={googleAPIKey} >
      <div className="google-map" style={ {height: '100vh', width: '175vh'} }>
        <Map
          zoom={isMapInitialized ? undefined : 5}
          center={isMapInitialized ? undefined : startingPosition} 
          onIdle={() => setMapInitialized(true)}
          mapId="5d89cad2f935803d"
        >
          {parkMarkers.map(park => (
            <AdvancedMarker
            key={park.park_id}
            position={{ lat: park.latitude, lng: park.longitude }}
            onClick={() => setSelectedPark(park)}
            />
          ))}

          {selectedPark && (
            <InfoWindow 
              position={{lat: selectedPark.latitude, lng: selectedPark.longitude }} 
              onCloseClick={() => setSelectedPark(null)}>
                <div>
                  <h3 onClick={handleClick} style={{color: 'black'}}>{selectedPark.fullName}</h3>
                  <p style={{ color: 'black' }}>Popular Actvities in {selectedPark.fullName}</p>
                  <div className="marker-activities">
                    <ul>
                      {selectedPark.activities.map(activity => (
                        <li style={{ color: 'black' }}>{activity.name}</li>
                      ))}
                    </ul>
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
  )
}

export default Maps