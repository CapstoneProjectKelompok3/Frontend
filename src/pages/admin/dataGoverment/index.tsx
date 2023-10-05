import Button from "../../../component/Button";
import Input from "../../../component/Input";
import Navbar from "../../../component/Navbar";
import Popup from "../../../component/Popup";
import Sidebar from "../../../component/Sidebar";
import Cookie from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import axios from "axios";
import { useFormik } from "formik";
import { validateGooverment } from "../../../validate/auth";

interface Gooverment {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
}

const libraries = ["places"];

const DataGoverment = () => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(0);
  const [gooverment, setGooverment] = useState<Gooverment[]>([]);
  const [address, setAddress] = useState<string>("Jl");
  const gmapsApi = "AIzaSyBlU8Tj6O7eJD-49jUXxLQNIC6pyKzInFY";
  const [selected, setSelected] = useState<any>({ lat: -6.2, lng: 106.816666 });
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const role = Cookie.get("role");

  const center = useMemo(() => {
    if (selected) {
      return { lat: selected.lat, lng: selected.lng };
    } else {
      return { lat: -6.2, lng: 106.816666 };
    }
  }, [selected]);
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (role === "user") {
      navigate("/beranda");
    } else if (role === "superadmin") {
      navigate("/dashboard");
    }
  });

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelected({ lat, lng });
  };

  const getAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${gmapsApi}`
      );

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        toast.error("Alamat Tidak ditemukan");
      }
    } catch (err) {
      toast.error("Gagal mengambil alamat");
    }
  };

  useEffect(() => {
    getAddress(selected.lat, selected.lng);
  }, [selected]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("Silahkan Login Terlebih Dahulu");
      }, 200);
    }
  }, []);

  const getDataGoverment = async () => {
    try {
      const response = await axios.get(
        `https://belanjalagiyuk.shop/governments?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGooverment(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://belanjalagiyuk.shop/governments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalDelete(false);
      getDataGoverment();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "rumah sakit",
      jumlah_unit: 0,
      address: address,
      latitude: "",
      longitude: "",
    },
    validationSchema: validateGooverment,
    onSubmit: (values) => {
      axios
        .post(
          `https://belanjalagiyuk.shop/governments`,
          {
            name: values.name,
            type: values.type,
            address: values.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          setOpen(false);
          getDataGoverment();
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(error.response.data.message);
        });
    },
  });

  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gmapsApi,
    libraries: libraries,
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
              <Button onClick={() => setOpen(true)} label="Tambah" />
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
                {gooverment && gooverment.length > 0 ? (
                  gooverment.map((element, index) => (
                    <tr
                      key={index}
                      className="bg-gray-300-200 items-center border-none font-medium"
                    >
                      <td>
                        <div>{index + 1}</div>
                      </td>
                      <td>{element.name}</td>
                      <td>{element.type}</td>
                      <td>{element.address}</td>
                      <td>
                        <div className="flex gap-7">
                          <div
                            onClick={() => {
                              setEdit(true), setId(element.id);
                            }}
                            className="cursor-pointer hover:text-primary"
                          >
                            <i className="fa-solid fa-pen-to-square text-md"></i>
                          </div>
                          <div
                            onClick={() => {
                              setModalDelete(true), setId(element.id);
                            }}
                            className="cursor-pointer hover:text-primary"
                          >
                            <i className="fa-solid fa-trash text-md"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b-0">
                    <td colSpan={6} className="text-center font-semibold">
                      Tidak Ada Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {open && (
          <Popup onConfirm={() => setOpen(false)}>
            <div className="relative w-full">
              <div className="relative w-[80vw] h-fit bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Tambah Goverment
                  </div>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Nama <span className="text-primary">*</span>
                        </label>
                        <Input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="name"
                          placeholder="Masukkan Nama Goverment"
                          className="p-3 w-full"
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Type <span className="text-primary">*</span>
                        </label>
                        <select
                          onChange={formik.handleChange}
                          name="type"
                          className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md"
                        >
                          <option value={"rumah sakit"}>Rumah Sakit</option>
                          <option value={"dishub"}>Dishub</option>
                          <option value={"damkar"}>Damkar</option>
                          <option value={"polisi"}>Polisi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: "30vh",
                          position: "relative",
                        }}
                      >
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
                              position={
                                selected
                                  ? selected
                                  : { lat: -6.2, lng: 106.816666 }
                              }
                              draggable={true}
                            ></MarkerF>
                          )}
                        </GoogleMap>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Koordinat Latitude{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <div>{selected.lat}</div>
                      </div>
                      <div>
                        <label className="block py-1 text-sm font-medium text-black">
                          Koordinat Longitude{" "}
                          <span className="text-primary">*</span>
                        </label>
                        <div>{selected.lng}</div>
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
                          name="jumlah_unit"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.jumlah_unit &&
                        formik.errors.jumlah_unit ? (
                          <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                            {formik.errors.jumlah_unit}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="py-2">
                      <Button type="submit" label="Tambahkan" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )}
        {/* {edit && (
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
        )} */}
      </div>
    </section>
  );
};

const SearchMap = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [selectLocation, setSelectLocation] = useState<boolean>(false);

  const handleInput = (e) => {
    setValue(e.target.value);
    setSelectLocation(false);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });

    const { lat, lng } = await getLatLng(result[0]);

    setSelected({ lat, lng });
    setSelectLocation(true);
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
        <div
          className={`overflow-y-auto h-36 rounded-md mt-2 ${
            value === "" || selectLocation === true ? "hidden" : ""
          }`}
        >
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
