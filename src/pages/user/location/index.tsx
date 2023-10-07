import { useEffect, useState, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../component/Button";

const DragAndDropMarker = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlU8Tj6O7eJD-49jUXxLQNIC6pyKzInFY",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>
    <iframe src="https://lottie.host/?file=020e0523-54f0-4c46-8272-c09f4e1acd98/vP29CkhiUp.json"></iframe>
  </div>;
  return <Map />;
};

function Map() {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>();
  const token = Cookie.get("token");
  const navigate = useNavigate();
  const latitude = parseFloat(localStorage.getItem("userLatitude"));
  const longitude = parseFloat(localStorage.getItem("userLongitude"));
  const isConfirm = localStorage.getItem("isConfirm");
  const role = Cookie.get("role");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
    if (role === "admin" || role === "superadmin") {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (isNaN(latitude) && isNaN(longitude)) {
      navigate("/beranda");
    }
  }, [token, navigate]);

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

  const confirmLocation = () => {
    localStorage.setItem("isConfirm", true);
    navigate("/chat");
  };

  const cancelLocation = () => {
    localStorage.removeItem("isConfirm");
    navigate("/beranda");
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
      {isConfirm === 'false' ? (
        <div className="absolute bottom-2 mx-[2vw] h-[17vh] w-[96vw] bg-white text-center px-3 py-5 rounded-2xl">
          <div>Apakah lokasi anda sudah sesuai ?</div>
          <div className="flex flex-row justify-between px-6 py-2">
            <Button label="Next" onClick={() => confirmLocation()} />
            <Button
              label="Cancel"
              className="bg-secondary focus:bg-secondary border-secondary outline-secondary"
              onClick={() => cancelLocation()}
            />
          </div>
        </div>
      ) : 
        null
      }
    </div>
  );
}

export default DragAndDropMarker;
