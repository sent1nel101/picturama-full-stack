import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import logo from '../assets/logo_white.png'
import bgVideo from '../assets/bg1.mp4'
import { client } from '../client'

const Login = () => {
    const navigate = useNavigate()
    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj))

        const { name, googleId, imageUrl } = response.profileObj

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', {replace: true})
        })
    }
    return (
        <div className=" flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
            <video 
                src={bgVideo}
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
            />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bg-blackOverlay bottom-0 opacity-85">
                    <div className='p-5'>
                        <img id="logo" className="relative" src={logo} alt="logo" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-emerald-100 flex justify-center items-center p-3 rounded-3xl cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                ><FcGoogle className="mr-4" />Start with Google</button>
                               
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                            />
                        
                    </div>
                </div>
            
                {/* <p style={{fontSize: '8px'}}>Video by MART PRODUCTION from Pexels</p> */}
                </div>
        
            </div>
    )
}

export default Login
