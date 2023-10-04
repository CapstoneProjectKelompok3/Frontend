import Button from "../../../component/Button";
import Input from "../../../component/Input";
import Navbar from "../../../component/Navbar";
import Popup from "../../../component/Popup";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
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

const DataGoverment = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState<string>("Jl");

  const [locLatitude, setLocLatitude] = useState(localStorage.getItem("latitude"));
  const [locLongitude, setLocLongitude] = useState(localStorage.getItem("longitude"));
  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "latitude") {
        setLocLatitude(e.newValue);
      }
      if (e.key === "longitude") {
        setLocLongitude(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const token = Cookie.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, []);

  const handleclick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
  };

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlU8Tj6O7eJD-49jUXxLQNIC6pyKzInFY",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading</div>;

  return (
    <section>
      <Navbar />
      <Sidebar />
      <div className="ml-[20vw] pt-28 px-8">
        <div className="bg-white rounded-md p-10">
          <div className="flex justify-between items-center py-3 gap-4">
            <div>
              <Input
                placeholder="Cari Goverments"
                className="p-3 w-full"
                search={
                  <i className="fa-solid text-secondary fa-magnifying-glass"></i>
                }
              />
            </div>
            <div>
              <Button onClick={handleclick} label="Tambah" />
            </div>
          </div>
          <div className="overflow-x-auto border rounded-md">
            <table className="table">
              <thead>
                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Type</th>
                  <th>Alamat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-300-200 items-center border-none font-medium">
                  <td>
                    <div>1</div>
                  </td>
                  <td>Ruma Sakit 1</td>
                  <td>Ruma Sakit</td>
                  <td>Jln. Kalimantan</td>
                  <td>
                    <div className="flex gap-7">
                      <div
                        onClick={handleEdit}
                        className="cursor-pointer hover:text-primary"
                      >
                        <i className="fa-solid fa-pen-to-square text-md"></i>
                      </div>
                      <div className="cursor-pointer hover:text-primary">
                        <i className="fa-solid fa-trash text-md"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {open && (
          <Popup onConfirm={handleClose}>
            <div className="relative w-full max-h-full">
              <div className="relative w-[50vw] bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Tambah Goverment
                  </div>
                  <form className="space-y-4" action="#">
                    <div className="grid grid-cols-2 gap-x-5">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Nama <span className="text-primary">*</span>
                        </label>
                        <Input
                          placeholder="Masukkan Nama Goverment"
                          className="px-2 py-3 w-full"
                        />
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Type <span className="text-primary">*</span>
                        </label>
                        <select className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md">
                          <option disabled selected>
                            Pilih Type
                          </option>
                          <option>Rumah Sakit</option>
                          <option>Dishub</option>
                          <option>Damkar</option>
                          <option>Polisi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Map />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Koordinat Latitude{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <div>{locLatitude}</div>
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Koordinat Longitude{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <div>{locLongitude}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Alamat <span className="text-primary">*</span>
                        </label>
                        <div>{address}</div>
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Jumlah Unit
                          <span className="text-primary">*</span>
                        </label>
                        <Input
                          placeholder="Masukkan Jumlah Unit"
                          className="px-2 py-3 w-full"
                        />
                      </div>
                    </div>
                    <div className="py-2">
                      <Button onClick={handleclick} label="Tambahkan" className="w-full"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )}
        {edit && (
          <Popup onConfirm={handleEditClose}>
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative w-96 bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Edit Goverment
                  </div>
                  <form className="space-y-4" action="#">
                    <div>
                      <label className="block py-1 text-sm font-medium text-black">
                        Nama <span className="text-primary">*</span>
                      </label>
                      <Input
                        placeholder="Masukkan Nama Goverment"
                        className="p-3 w-full"
                      />
                    </div>
                    <div>
                      <label className="block py-1 text-sm font-medium text-black">
                        Type <span className="text-primary">*</span>
                      </label>
                      <select className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md">
                        <option disabled selected>
                          Pilih Type
                        </option>
                        <option>Rumah Sakit</option>
                        <option>Dishub</option>
                        <option>Damkar</option>
                        <option>Polisi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block py-1 text-sm font-medium text-black">
                        Alamat <span className="text-primary">*</span>
                      </label>
                      <Input
                        placeholder="Masukkan Alamat Goverment"
                        className="p-3 w-full"
                      />
                    </div>
                    <div className="py-2">
                      <Button onClick={handleclick} label="Tambahkan" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </section>
  );
};

function Map() {
  const [selected, setSelected] = useState<any>(null);

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
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);
  };

  return (
    <div style={{ width: "100%", height: "30vh", position: "relative" }}>
      <div>
        <SearchMap setSelected={setSelected} />
      </div>

      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "30vh",
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
  const [selectLocation, setSelectLocation] = useState<boolean>(false)

  const handleInput = (e) => {
    setValue(e.target.value)
    setSelectLocation(false)
  }

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });

    const { lat, lng } = await getLatLng(result[0]);

    setSelected({ lat, lng });
    setSelectLocation(true)
  };

  return (
    <>
      <div className="absolute top-1 z-10 w-full px-10 mt-2">
        <Input
          placeholder="Cari Alamat"
          type="text"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          className="w-52 h-8 bg-white mx-auto text-sm"
        />
        <div className={`overflow-y-auto h-36 rounded-md mt-2 ${value === '' || selectLocation === true ? 'hidden' : ''}`}>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <div
              className="bg-white hover:bg-gray-300 p-2 text-sm"
              key={place_id}
              onClick={() => handleSelect(description)}
            >
              {description}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DataGoverment;
