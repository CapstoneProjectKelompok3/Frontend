import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Input from "../../../component/Input";
import Cookie from "js-cookie";
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from "react-router";
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
  const [selected, setSelected] = useState<any>(null);
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu")
      }, 200);
    }
  }, [])

  useEffect(() => {
    if (role === 'admin' || role === 'superadmin') {
      navigate('/dashboard')
    }
  })
  const center = useMemo(() => {
    if (selected) {
      return { lat: selected.lat, lng: selected.lng };
    } else {
      return { lat: -6.2, lng: 106.816666 };
    }
  }, [selected]);

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelected({ lat, lng });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <SearchMap setSelected={setSelected} />
      </div>

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
        {selected && (
          <MarkerF
            position={selected ? selected : { lat: -6.2, lng: 106.816666 }}
            draggable={true}
          >
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
            >
              <div className="flex flex-row gap-x-2">
                <i className="fa-solid fa-location-dot"></i>
                <p>Your Location</p>
              </div>
            </InfoWindow>
          </MarkerF>
        )}
      </GoogleMap>
    </div>
  );
}

const SearchMap = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });

    const { lat, lng } = await getLatLng(result[0]);

    setSelected({ lat, lng });
  };

  return (
    <>
      <div className="absolute top-1 z-10 bg-white px-2">
        <Input
          placeholder="Cari Alamat"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-[100vw] h-12"
        />
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <button className="w-full" key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </button>
          ))}
      </div>
    </>
  );
};

export default DragAndDropMarker;
