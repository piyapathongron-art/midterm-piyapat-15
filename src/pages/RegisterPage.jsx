import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { registerValidator } from '../validator/registerValidator';

export default function RegisterPage() {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmpassword: ''
    })


    function hdlChange(e) {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }))
    }

    const navigate = useNavigate()

    const [error, setError] = useState({})

    function hdlRegister(e) {
        e.preventDefault()

        const result = registerValidator.safeParse(registerForm)

        console.log(result)
        if (result.success) {
            try {
                navigate('/')
                toast.success('ลงทะเบียนสำเร็จ')
            } catch (error) {

            }
        } else {
           const {fieldErrors} = result.error.flatten()
           setError(fieldErrors)
           console.log(fieldErrors)
        }
    }

    return (
        <div className='loginpage h-200 flex flex-col justify-center items-center'>

            <form className="loginbox flex flex-col bg-gray-800 text-white  p-8 rounded-md gap-5 w-120 shadow-2xl" onSubmit={hdlRegister}>
                <h2 className='text-4xl font-bold'>Register</h2>

                <input className='bg-gray-600 p-3 px-4 rounded-md mt-5' type="text" placeholder='username'
                    name="username" value={registerForm.username} onChange={hdlChange} />
                {error?.username && <p className='text-red-500 -mt-5 ml-1'>{error.username}</p>}

                <input className='bg-gray-600 p-3 px-4 rounded-md' type="password" placeholder='password'
                    name="password" value={registerForm.password} onChange={hdlChange} />
                {error?.password && <p className='text-red-500 -mt-5 ml-1'>{error.password}</p>}

                <input className='bg-gray-600 p-3 px-4 rounded-md' type="password" placeholder='confirm password'
                    name="confirmpassword" value={registerForm.confirmpassword} onChange={hdlChange} />
                {error?.confirmpassword && <p className='text-red-500 -mt-5 ml-1'>{error.confirmpassword}</p>}
                
                <button className='bg-gray-600 p-3 rounded-md cursor-pointer duration-500 hover:bg-gray-700 active:bg-gray-900'>Sign up</button>


                <p className='text-center'>Already have an account? <Link to='/'> <span className='text-blue-500'>Login</span></Link></p>
            </form>
            {/* <pre className='text-white'>{JSON.stringify(registerForm)}</pre> */}
        </div>
    )
}
