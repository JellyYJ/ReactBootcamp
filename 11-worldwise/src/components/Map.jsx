import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Button from "./Button";

import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLposition } from "../hooks/useURLposition";

function Map() {
  const { cities } = useCities();

  // useGeolocation customised hook
  const {
    isLoading: isLoadingPos,
    position: geolocationPos,
    getPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  /* Moved to useURLposition.js */
  // get lat, lng from URL
  // const [searchParams] = useSearchParams();
  // const mapLat = searchParams.get("lat");
  // const mapLng = searchParams.get("lng");

  // useEffect(
  //   function () {
  //     if ((mapLat, mapLng)) {
  //       setMapPosition([mapLat, mapLng]);
  //     }
  //   },
  //   [mapLat, mapLng]
  // );

  // useURLposition costumised hook
  // const [mapLat, mapLng] = useURLposition();

  // get current geolocation
  useEffect(
    function () {
      if (geolocationPos) {
        setMapPosition([geolocationPos.lat, geolocationPos.lng]);
      }
    },
    [geolocationPos]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPos ? "Loading position..." : "Use your position"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        // center = {[mapLat || 40, mapLng || 0]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />

        <DetectClick />
      </MapContainer>
    </div>
  );
}

/* Cutomised components */
// Changing center when choosing different cities
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

// Handling clicking on the map
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), // get the position data into URL
  });
}
export default Map;
