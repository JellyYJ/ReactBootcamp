import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // useNavigate hook provides navigate function
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
}

export default Map;
