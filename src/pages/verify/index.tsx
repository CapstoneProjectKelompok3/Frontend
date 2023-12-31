import { useNavigate, useParams } from "react-router"
import Button from "../../component/Button"
import axios from "axios"
import { useEffect, useState } from 'react'
const Verify = () => {
    const navigate = useNavigate()
    const { key } = useParams()
    const [msg, setMsg] = useState('')
    useEffect(() => {
        handleVerify()
    }, [])

    const handleVerify = () => {
        axios.put(`https://api.flattenbot.site/users/verify-email?key=${key}`)
            .then((response) => {
                setMsg(response.data.message)
            })
            .catch((error) => {
                if (error.response.data.status_code === 403) {
                    setMsg('Key salah atau Key Sudah tidak berlaku')
                }
            })
    }
    return (
        <div>
            <section className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight text-center tracking-tight">
                            Emergency Call Center Indonesia
                        </h2>
                        <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-center">{msg}</label>
                            </div>
                            <div className='flex justify-end'>
                                <Button label='OK' className="w-full" onClick={() => navigate('/login')} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verify