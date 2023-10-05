import { useEffect, useState, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DragAndDropMarker = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlU8Tj6O7eJD-49jUXxLQNIC6pyKzInFY",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading</div>;
  return <Map />;
};

function Map() {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const token = Cookie.get("token");
  const navigate = useNavigate();
  const latitude = parseFloat(localStorage.getItem("userLatitude") || "0");
  const longitude = parseFloat(localStorage.getItem("userLongitude") || "0");
  const role = Cookie.get("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  const center = useMemo(() => {
    if (selected) {
      return { lat: selected.lat, lng: selected.lng };
    } else {
      return { lat: latitude, lng: longitude };
    }
  }, [selected, latitude, longitude]);

  const handleMapClick = async (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelected({ lat, lng });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
          position: "static",
        }}
        center={center}
        zoom={15}
        onClick={handleMapClick}
      >
        {selected ? (
          <Marker position={selected} draggable={true} />
        ) : (
          <Marker position={{ lat: latitude, lng: longitude }} draggable={true} />
        )}
      </GoogleMap>
    </div>
  );
}

export default DragAndDropMarker;
