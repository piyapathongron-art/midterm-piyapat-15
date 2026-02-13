import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import useUserInfo from '../stores/userInfo'
import TodoListPage from './TodoListPage'

function LoginPage() {
    const [formLogin, setFormLogin] = useState({
        username: '',
        password: ''
    })

    const user = useUserInfo((state)=>state.user)
    console.log(user)
    const logOut = useUserInfo((state)=>state.logOut)

    const navigate = useNavigate()

    const hdlChange = (e) => {
       const  {name,value} = e.target
       setFormLogin((prev)=>({...prev,[name]:value}))
    }


    const setUser = useUserInfo((state)=>state.setUser)
    const setToken = useUserInfo((state)=>state.setToken)

    const hdlLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('https://drive-accessible-pictures-send.trycloudflare.com/auth/login',formLogin)
            const {user} = res.data
            const {token, userID, username} = user
            console.log(user)
            setUser(username,userID)
            setToken(token)
            navigate('/todolist')
            toast.success('Login Success')

        } catch (error) {
            toast.error('wrong username or password')
            
        }

    }
    //if login
    if(user){
       return <div className='loginpage h-200 flex flex-col justify-center items-center'>
        
            <form className="loginbox flex flex-col bg-gray-800 text-white  p-8 rounded-md gap-10 w-120 shadow-2xl">
                <h2 className='text-center text-4xl font-bold'>Welcome</h2>

                <h1 className='text-center text-2xl font-bold'>{user}</h1>
                
                <button onClick={()=>(logOut())} className='bg-red-500 p-3 rounded-md cursor-pointer duration-500 hover:bg-red-400 active:bg-red-900'>LOG OUT</button>
            </form>
        </div>
    }
    //if not login
    return (
        <div className='loginpage h-200 flex flex-col justify-center items-center'>
        
            <form onSubmit={hdlLogin} className="loginbox flex flex-col bg-gray-800 text-white  p-8 rounded-md gap-5 w-120 shadow-2xl">
                <h2 className='text-4xl font-bold'>Login</h2>

                <input className='bg-gray-600 p-3 px-4 rounded-md mt-5' type="text" placeholder='username' 
                name="username" value={formLogin.username} onChange={hdlChange}/>

                <input className='bg-gray-600 p-3 px-4 rounded-md' type="password" placeholder='password' 
                name="password" value={formLogin.password} onChange={hdlChange}/>
                
                <button className='bg-gray-600 p-3 rounded-md cursor-pointer duration-500 hover:bg-gray-700 active:bg-gray-800'>LOG IN</button>

            {/* <pre>{JSON.stringify(formLogin)}</pre> */}
            </form>
        </div>
    )
}

export default LoginPage