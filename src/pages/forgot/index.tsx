import Input from '../../component/Input'
import Button from '../../component/Button'
import axios from 'axios'
import { useFormik } from 'formik'
import { validateForgot } from '../../validate/auth'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
const Forgot = () => {
    const navigate = useNavigate();
    const token = Cookie.get('token')
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validateForgot,
        onSubmit: (values) => {
            axios.post(`https://api.flattenbot.site/users/resetpass`, {
                email: values.email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response)
                    toast.success("Password Berhasil Dikirim ke Email")
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })
    return (
        <div>
            <section className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight">
                            Lupa Kata Sandi
                        </h2>
                        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Email</label>
                                <Input onChange={formik.handleChange} name='email' placeholder='Masukkan Email Anda' />
                            </div>
                            <div className='flex justify-end'>
                                <Button label='submit' type='submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgot