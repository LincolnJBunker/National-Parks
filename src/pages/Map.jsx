import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import googleAPIKey from "../hidden.js";

function Maps() {
  const startingPosition = { lat: 37.29 , lng: -112.99 };
  const [isMapInitialized, setMapInitialized] = useState(false);
  return (
    <APIProvider apiKey={googleAPIKey} >
      <div className="google-map" style={ {height: '100vh'} }>
        <Map
          zoom={isMapInitialized ? undefined : 15}
          center={isMapInitialized ? undefined : startingPosition} 
          onIdle={() => setMapInitialized(true)}
        >
        </Map>
      </div>
    </APIProvider>
  )
}

export default Maps