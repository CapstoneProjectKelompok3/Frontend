import Cookie from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { DirectionsRenderer, GoogleMap,  MarkerF, useLoadScript } from "@react-google-maps/api";
import Button from "../../../component/Button";
import axios from "axios";
import toast from "react-hot-toast";

const DetailJob = () => {
  const token = Cookie.get("token");
  const navigate = useNavigate();
  const role = Cookie.get("role");
  const [selected, setSelected] = useState<{
    lat: number;
    lng: number;
  } | null>();

  const [directions, setDirections] = useState(null);
  const [isArrived, setIsArrived] = useState(false);
  const [status, setStatus] = useState("Terima");
  const [confirm, setConfirm] = useState<boolean>(true);
  const [reason, setReason] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [dataEmergency, setDataEmergency] = useState<any>([]);
  const locationTarget = {
    lat: dataEmergency.latitude,
    lng: dataEmergency.longitude,
  };



  const requestDirections=() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {lat: data.latitude, lng: data.longitude},
        destination: locationTarget,
        travelMode: 'DRIVING', // Anda dapat mengganti mode perjalanan sesuai kebutuhan (e.g., DRIVING, WALKING)
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );

  }

  const requestDirectionsJalan=() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {lat: data.latitude, lng: data.longitude},
        destination: locationTarget,
        travelMode: 'DRIVING', // Anda dapat mengganti mode perjalanan sesuai kebutuhan (e.g., DRIVING, WALKING)
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  // intervalId
  // console.log("CURR POSITION",currentPosition)
    // console.log('Current Directions',directions)
    // const timerId = setTimeout(() => {
    //   setIsArrived(true);
    // }, 3000); // Waktu dalam milidetik (3 detik)
    // console.log("tiba",isArrived)
    // // Bersihkan timer saat komponen unmount atau waktu perubahan
    // return () => clearTimeout(timerId);

    setInterval(() => {
      const path = directions?.routes[0]?.overview_path; // Ambil jalur rute
    
      if (path && path.length > 0) {
     
        setCurrentPosition(path.shift()); // Geser posisi marker ke titik berikutnya di jalur
        
        // console.log("PATH",path)
        if(path && path.length===0){
          setIsArrived(true)
        }
      }
      
    }, 120)
  }

 

  const getData = () => {
    axios
      .get("https://belanjalagiyuk.shop/driver/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch(() => {
        toast.error("Gagal mendapatkan data");
      });
  };

  const getDataEmergency = async () => {
    try {
      const response = await axios.get(
        `https://belanjalagiyuk.shop/emergencies/${data.emergency_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data,"emergency")
      setDataEmergency(response?.data?.data);
    } catch (error) {
      toast.error("Gagal mendapatkan data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.emergency_id) {
      getDataEmergency();
    }
  }, [data.emergency_id]);

  const confirmJob = () => {
    axios
      .post(
        "https://belanjalagiyuk.shop/driver/confirm",
        {
          is_accepted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        requestDirections()
        setStatus("Jalan")
        // setDone(true);
        // setConfirm(false);
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message);
      });
  };

 

  const jalan = () => {
        requestDirectionsJalan()
        setStatus("Berangkat")
        setDone(true);
        setConfirm(false);
  };

  const rejectJob = () => {
    axios
      .post(
        "https://belanjalagiyuk.shop/driver/confirm",
        {
          is_accepted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate("/dashboard-petugas");
      })
      .catch(() => {
        toast.error("Gagal menolak pekerjaan");
      });
  };

  const confirmDone = () => {
    axios
      .post(
        `https://belanjalagiyuk.shop/drivers/finished?emergenci_id=${data.emergency_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Tugas Anda telah selesai. Terima Kasih !");
        setTimeout(() => {
          navigate("/riwayat-petugas");
        }, 1500);
      })
      .catch(() => {
        toast.error("Gagal menyelesaikan tugas");
      });
  };
  

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
    } else if (role === "superadmin" || role === "admin") {
      navigate("/dashboard");
    }
  });

  const center = useMemo(() => {
    if (selected) {
      return { lat: selected.lat, lng: selected.lng };
    } else {
      return { lat: -6.2, lng: 106.816666 };
    }
  }, [selected]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlU8Tj6O7eJD-49jUXxLQNIC6pyKzInFY",
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div>
        <iframe src="https://lottie.host/?file=020e0523-54f0-4c46-8272-c09f4e1acd98/vP29CkhiUp.json"></iframe>
      </div>
    );

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
        {directions && <DirectionsRenderer directions={directions} />}
        {status==="Berangkat" &&currentPosition && <MarkerF position={currentPosition} label="Current Position" />}
      </GoogleMap>
      {confirm === true ? (
        <div className="absolute bottom-0 w-full bg-white text-center px-3 py-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="font-semibold">Detail Laporan {data?.emergency_name}</div>
          <div className="text-sm text-justify px-2">
          <b>{data?.emergency_name}</b> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </div>
          <div className="flex flex-row justify-between px-6 py-2">
            <Button
              label="Tolak"
              className="bg-secondary focus:bg-secondary border-secondary outline-secondary"
              onClick={() => {
                setReason(true), setConfirm(false);
              }}
            />
            <Button label={status} onClick={() => confirmJob()} />
          </div>
        </div>
      ) : null}
      {status === "Jalan" ? (
        <div className="absolute bottom-0 w-full bg-white text-center px-3 py-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="font-semibold">Detail Laporan {data?.emergency_name}</div>
          <div className="text-sm text-justify px-2">
          <b>{data?.emergency_name}</b> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </div>
          <div className="flex flex-row justify-between px-6 py-2">
            {/* <Button
              label="Tolak"
              className="bg-secondary focus:bg-secondary border-secondary outline-secondary"
              onClick={() => {
                setReason(true), setConfirm(false);
              }}
            /> */}
            <Button  label={status} onClick={() => jalan()} className="w-11/12" />
          </div>
        </div>
      ) : null}
      {reason === true ? (
        <div className="absolute bottom-0 w-full bg-white text-center px-3 py-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="font-semibold">Berikan Alasan</div>
          <div>
            <textarea
              className="w-full h-36 bg-transparent border-line border rounded-md p-2 focus:border-line"
              name="reason"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="flex flex-row justify-between px-6 py-2">
            <Button
              label="Kembali"
              className="bg-secondary focus:bg-secondary border-secondary outline-secondary"
              onClick={() => {
                setReason(false), setConfirm(true);
              }}
            />
            <Button label="Kirim" onClick={() => rejectJob()} />
          </div>
        </div>
      ) : null}
      {done === true ? (
        <div className="absolute bottom-0 w-full bg-white text-center px-3 py-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="font-semibold">Detail Laporan {data?.emergency_name}</div>
          <div className="text-sm text-justify px-2">
            <b>{data?.emergency_name}</b> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </div>
      {
        isArrived &&(    <div className=" mt-2 w-full text-end">
        <Button label="Selesai" onClick={() => confirmDone()} />
      </div>)
      }
        </div>
      ) : null}
    </div>
  );
};

export default DetailJob;
