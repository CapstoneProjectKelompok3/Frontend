import Button from "../../../component/Button"
import Input from "../../../component/Input"
import Navbar from "../../../component/Navbar"
import Popup from "../../../component/Popup"
import Sidebar from "../../../component/Sidebar"
import Cookie from "js-cookie";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios"
import { useFormik } from "formik"
import { validateGooverment } from "../../../validate/auth"

interface Gooverment {
    id: number
    address: string
    latitude: number
    longitude: number
    name: string
    type: string
}
const DataGoverment = () => {
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [id, setId] = useState(0)
    const [gooverment, setGooverment] = useState<Gooverment[]>([])
    const token = Cookie.get("token");
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
            setTimeout(() => {
                toast.error("Silahkan Login Terlebih Dahulu")
            }, 200);
        }
    }, [])

    const getDataGoverment = async () => {
        try {
            const response = await axios.get(`https://belanjalagiyuk.shop/governments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setGooverment(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://belanjalagiyuk.shop/governments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setModalDelete(false)
            getDataGoverment()
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            address: '',
            latitude: 0,
            longitude: 0,
        },
        validationSchema: validateGooverment,
        onSubmit: (values) => {
            axios.post(`https://belanjalagiyuk.shop/governments`, {
                name: values.name,
                type: values.type,
                address: values.address,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                toast.success(response.data.message)
                setOpen(false)
                getDataGoverment()
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
        }
    })
    const formikEdit = useFormik({
        initialValues: {
            name: '',
            type: '',
            address: '',
            latitude: 0,
            longitude: 0,
        },
        validationSchema: validateGooverment,
        onSubmit: (values) => {
            axios.put(`https://belanjalagiyuk.shop/governments/${id}`, {
                name: values.name,
                type: values.type,
                address: values.address,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                toast.success(response.data.message)
                setEdit(false)
                getDataGoverment()
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
        }
    })

    const rootElement = document.documentElement;
    rootElement.style.backgroundColor = "#FAFAFA";

    useEffect(() => {
        getDataGoverment()
    }, [])
    return (
        <section>

            <Navbar />
            <Sidebar />
            <div className="ml-[20vw] pt-28 px-8">
                <div className="bg-white rounded-md p-10">
                    <div className="flex justify-between items-center py-3 gap-4">
                        <div>
                            <Input placeholder="Cari Goverments" className="p-3 w-full" search={<i className="fa-solid text-secondary fa-magnifying-glass"></i>} />
                        </div>
                        <div>
                            <Button onClick={() => setOpen(true)} label='Tambah' />
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
                                        <tr key={index} className="bg-gray-300-200 items-center border-none font-medium">
                                            <td>
                                                <div>{index + 1}</div>
                                            </td>
                                            <td>
                                                {element.name}
                                            </td>
                                            <td>
                                                {element.type}
                                            </td>
                                            <td>
                                                {element.address}
                                            </td>
                                            <td>
                                                <div className='flex gap-7'>
                                                    <div onClick={() => { setEdit(true), setId(element.id) }} className='cursor-pointer hover:text-primary'>
                                                        <i className="fa-solid fa-pen-to-square text-md"></i>
                                                    </div>
                                                    <div onClick={() => { setModalDelete(true), setId(element.id) }} className='cursor-pointer hover:text-primary'>
                                                        <i className="fa-solid fa-trash text-md"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )) : (
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
                </div>
                {
                    open && (
                        <Popup onConfirm={() => setOpen(false)}>
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative w-96 bg-white rounded-lg shadow">
                                    <div className="px-6 py-6 lg:px-8">
                                        <div className="mb-4 text-xl text-center font-bold text-black">
                                            Tambah Goverment
                                        </div>
                                        <form onSubmit={formik.handleSubmit} className="space-y-4" action="#">
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Nama <span className='text-primary'>*</span>
                                                </label>
                                                <Input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="name" placeholder="Masukkan Nama Goverment" className="p-3 w-full" />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                                                        {formik.errors.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Type <span className='text-primary'>*</span>
                                                </label>
                                                <select onChange={formik.handleChange} name="type" className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md">
                                                    <option value={'rumah sakit'}>Rumah Sakit</option>
                                                    <option value={'dishub'}>Dishub</option>
                                                    <option value={'damkar'}>Damkar</option>
                                                    <option value={'polisi'}>Polisi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Alamat <span className='text-primary'>*</span>
                                                </label>
                                                <Input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="address" placeholder="Masukkan Alamat Goverment" className="p-3 w-full" />
                                                {formik.touched.address && formik.errors.address ? (
                                                    <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                                                        {formik.errors.address}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="py-2">
                                                <Button type="submit" label='Tambahkan' />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    )
                }
                {
                    edit && (
                        <Popup onConfirm={() => setEdit(false)}>
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative w-96 bg-white rounded-lg shadow">
                                    <div className="px-6 py-6 lg:px-8">
                                        <div className="mb-4 text-xl text-center font-bold text-black">
                                            Edit Goverment
                                        </div>
                                        <form onSubmit={formikEdit.handleSubmit} className="space-y-4" action="#">
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Nama <span className='text-primary'>*</span>
                                                </label>
                                                <Input
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    name="name" placeholder="Masukkan Nama Goverment" className="p-3 w-full" />
                                                {formikEdit.touched.name && formikEdit.errors.name ? (
                                                    <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                                                        {formikEdit.errors.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Type <span className='text-primary'>*</span>
                                                </label>
                                                <select onChange={formikEdit.handleChange} name="type" className="select select-bordered bg-white text-secondary p-2 font-medium w-full select-md">
                                                    <option value={'rumah sakit'}>Rumah Sakit</option>
                                                    <option value={'dishub'}>Dishub</option>
                                                    <option value={'damkar'}>Damkar</option>
                                                    <option value={'polisi'}>Polisi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block py-1 text-sm font-medium text-black">
                                                    Alamat <span className='text-primary'>*</span>
                                                </label>
                                                <Input
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    name="address" placeholder="Masukkan Alamat Goverment" className="p-3 w-full" />
                                                {formikEdit.touched.address && formikEdit.errors.address ? (
                                                    <div className="text-red-500 focus:outline-red-500 text-sm font-semibold py-2">
                                                        {formikEdit.errors.address}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="py-2 flex justify-end">
                                                <Button type="submit" label='Submit' />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    )
                }
                {
                    modalDelete && (
                        <Popup onConfirm={() => setModalDelete(false)}>
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
                    )
                }

            </div>
        </section>
    )
}

export default DataGoverment