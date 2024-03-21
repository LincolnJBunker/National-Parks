import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import googleAPIKey from "../hidden.js";
import axios from 'axios';

function Maps() {
  const [isMapInitialized, setMapInitialized] = useState(false);
  const [parkMarkers, setParkMarkers] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null)

  const startingPosition = { lat: 37.29 , lng: -112.99 };
  
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
                  <h3 style={{color: 'black'}}>{selectedPark.fullName}</h3>
                </div>
            </InfoWindow>
          )}

        </Map>
      </div>
    </APIProvider>
  )
}

export default Maps