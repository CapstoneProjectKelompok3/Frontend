import { useNavigate } from 'react-router';
import logo from '../../../public/logo.png'
import Button from '../../component/Button';
import Cookie from 'js-cookie'
const Landing = () => {
    const token = Cookie.get('token')
    const navigate = useNavigate()
    return (
        <div className="bg-white h-screen">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <div className="-m-1.5 p-1.5">
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {
                            token ? null : (
                                <div onClick={() => navigate('/login')} className="cursor-pointer hover:text-primary text-sm font-semibold leading-6 text-gray-900">
                                    Log in
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-80 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff3333] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Keselamatan Anda adalah Prioritas Kami
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            "Kami di sini untuk mengingatkan Anda tentang pentingnya panggilan darurat 911 dalam situasi darurat. Keamanan Anda adalah prioritas kami."
                        </p>
                        <div className="mt-10 transition hover:scale-105 flex items-center justify-center gap-x-6">
                            {
                                token ? (
                                    <Button
                                        type='button'
                                        label='Beranda'
                                        onClick={() => navigate('/beranda')}
                                    />
                                ) : (
                                    <Button
                                        type='button'
                                        label='Get Started'
                                        onClick={() => navigate('/login')}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Landing;
