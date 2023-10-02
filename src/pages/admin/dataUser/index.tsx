import { useEffect, useState } from "react";
import Button from "../../../component/Button";
import Navbar from "../../../component/Navbar";
import Sidebar from "../../../component/Sidebar";
import Input from "../../../component/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import Popup from "../../../component/Popup";
interface Data {
    id: number;
    email: string;
    level: string;
    username: string;
    is_activated: boolean;
}
const DataUser = () => {
    const rootElement = document.documentElement;
    rootElement.style.backgroundColor = "#FAFAFA";

    const [openModal, setOpenModal] = useState(false);
    const [dataUser, setDataUser] = useState<Data[]>([]);
    const [page, setPage] = useState(1);
    const [modalVerif, setOpenModalverif] = useState(false);
    const [id, setId] = useState<number>(0);
    const token = Cookie.get("token");
    const navigate = useNavigate();
    const getDataUser = async () => {
        try {
            const response = await axios.get(
                `https://api.flattenbot.site/users?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDataUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => {
        setOpenModal(false);
        setOpenModalverif(false);
    };
    const handleVerif = async () => {
        await axios
            .put(`https://api.flattenbot.site/users/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log(response);
                setOpenModalverif(false);
                getDataUser();
            })
            .catch((error) => {
                console.log("gagal")
                console.log(error.response)
                toast.error(error.response.data.message);
            });
    };

    useEffect(() => {
        getDataUser();
    }, [page]);

    const handleDelete = () => {

        axios
            .delete(`https://api.flattenbot.site/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                getDataUser();
                toast.success("Data Berhasil Di Hapus");
                setOpenModal(false);
            })
            .catch((error) => {
                console.log(error);
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

    return (
        <section>
            <Navbar />
            <Sidebar />
            <div className="ml-[20vw] pt-28 px-8">
                <div className="bg-white rounded-md p-10">
                    <div className="flex justify-between items-center py-3 gap-4">
                        <div>
                            <Input
                                placeholder="Cari User"
                                className="p-3 w-full"
                                search={
                                    <i className="fa-solid text-secondary fa-magnifying-glass"></i>
                                }
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded-md">
                        <table className="table">
                            <thead>
                                <tr className="bg-primary border-none rounded-md text-white text-[16px]">
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataUser && dataUser.length > 0 ? (
                                    dataUser.map((element, index) => (
                                        <tr
                                            key={index}
                                            className="bg-gray-300-200 items-center border-none font-medium"
                                        >
                                            <td>
                                                <div>{index + 1}</div>
                                            </td>
                                            <td>{element.username}</td>
                                            <td>{element.email}</td>
                                            <td>{element.level}</td>
                                            <td>
                                                {element.is_activated === true
                                                    ? "User Aktif"
                                                    : "User belum Verif"}
                                            </td>
                                            <td>
                                                <div className="flex gap-7">
                                                    {element.is_activated === false ? (
                                                        <div
                                                            onClick={() => {
                                                                setOpenModalverif(true), setId(element.id);
                                                            }}
                                                            className="cursor-pointer hover:text-primary"
                                                        >
                                                            <i className="fa-solid fa-circle-check"></i>
                                                        </div>
                                                    ) : null}

                                                    <div onClick={() => {
                                                        setOpenModal(true), setId(element.id);
                                                    }}
                                                        className="cursor-pointer hover:text-primary"
                                                    >
                                                        <i className="fa-solid fa-trash fa-lg"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center font-semibold w-full"
                                        >
                                            Tidak Ada Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {dataUser.length > 0 ? (
                        <div className="flex justify-end pt-10">
                            <div className="flex gap-5">
                                <div>
                                    <Button
                                        disabled={page === 1}
                                        className={`${page === 1
                                            ? "cursor-not-allowed bg-secondary hover:bg-secondary hover:border-secondary"
                                            : ""
                                            }`}
                                        onClick={() => setPage(page - 1)}
                                        label="Previous"
                                    />
                                </div>
                                <div>
                                    <Button onClick={() => setPage(page + 1)} label="Next" />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                {openModal && (
                    <Popup onConfirm={handleClose}>
                        <div className="relative h-56 bg-white rounded-lg shadow">
                            <div className="px-10 py-10 flex flex-col space-y-3 ">
                                <div className="space-y-2 flex flex-col justify-center items-center">
                                    <h3 className="text-xl text-center font-bold text-black">
                                        Hapus Data
                                    </h3>
                                    <p className="text-md text-center">
                                        Apakah Anda Yakin ingin Menghapus Data ini ?
                                    </p>
                                </div>
                            </div>
                            <div className="px-10 flex justify-end">
                                <Button onClick={() => handleDelete()} label="Oke" />
                            </div>
                        </div>
                    </Popup>
                )}
                {modalVerif && (
                    <Popup onConfirm={handleClose}>
                        <div className="relative h-56 bg-white rounded-lg shadow">
                            <div className="px-10 py-10 flex flex-col space-y-3 ">
                                <div className="space-y-2">
                                    <h3 className="text-xl  font-bold text-black">
                                        Verifikasi User
                                    </h3>
                                    <p className="text-md ">
                                        Silakan verifikasi akun pengguna ini sebelum memberikan
                                        akses penuh.
                                    </p>
                                </div>
                            </div>
                            <div className="px-10 flex justify-end">
                                <Button onClick={() => handleVerif()} label="Submit" />
                            </div>
                        </div>
                    </Popup>
                )}
            </div>
        </section>
    );
};

export default DataUser;
