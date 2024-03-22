import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

function MapMarker() {
    const {full_name, latitude, longitude } = park
  return (
    <div>
        <AdvancedMarker position={[latitude, longitude]}>
            <Pin />
        </AdvancedMarker>
    </div>
  )
}

export default MapMarker