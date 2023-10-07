import Cookie from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

  const [confirm, setConfirm] = useState<boolean>(true);
  const [reason, setReason] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const confirmJob = () => {
    axios
      .get("https://belanjalagiyuk.shop/driver/confirm", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDone(true);
        setConfirm(false);
      })
      .catch(() => {
        toast.error("Gagal menerima pekerjaan");
      });
  };

  const rejectJob = () => {};

  const confirmDone = () => {
    axios.post("https://belanjalagiyuk.shop/drivers/finished", {
      latitude: -6.21279,
      longitude: 106.8946959,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      toast.success('Tugas Anda telah selesai. Terima Kasih !')
      navigate('/riwayat-petugas')
    })
    .catch(() => {
      toast.error('Gagal menyelesaikan tugas')
    })
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login')
  //     setTimeout(() => {
  //       toast.error("Silahkan Login Terlebih Dahulu")
  //     }, 200);
  //   }
  // }, [])
  
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
        {selected ? (
          <Marker position={selected} draggable={true} />
        ) : (
          <Marker position={{ lat: -6.2, lng: 106.816666 }} draggable={true} />
        )}
      </GoogleMap>
      {confirm === true ? (
        <div className="absolute bottom-0 w-full bg-white text-center px-3 py-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="font-semibold">Detail Laporan</div>
          <div className="text-sm text-justify px-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </div>
          <div className="flex flex-row justify-between px-6 py-2">
            <Button
              label="Cancel"
              className="bg-secondary focus:bg-secondary border-secondary outline-secondary"
              onClick={() => {
                setReason(true), setConfirm(false);
              }}
            />
            <Button label="Next" onClick={() => confirmJob()} />
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
          <div className="font-semibold">Detail Laporan</div>
          <div className="text-sm text-justify px-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.
          </div>
          <div className=" mt-2 w-full text-end">
            <Button label="Selesai" onClick={() => confirmDone()} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DetailJob;
