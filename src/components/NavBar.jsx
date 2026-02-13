import React from 'react'
import { NavLink } from 'react-router'
import useUserInfo from '../stores/userInfo';

const styles = {
    baseLink: "bg-gray-600 p-2  rounded-2xl hover:bg-gray-800 duration-500 hover:font-bold",
    activeLink: "bg-gray-800 p-2 rounded-2xl duration-500"
}


const activeLink = (isActive) => isActive ? styles.activeLink : styles.baseLink;


function NavBar() {

    const user = useUserInfo((state)=>state.user)
    // console.log(user)

    //if login
    if(user){
        return <ul className='bg-gray-600 h-15 flex items-center justify-center text-2xl gap-20 text-white shadow-2xl'>
            <NavLink to="/" className={({isActive})=>activeLink(isActive)}> <li>Profile</li></NavLink>
            <NavLink to="register" className={({isActive})=>activeLink(isActive)}> <li>Register</li></NavLink>
            <NavLink to="todolist" className={({isActive})=>activeLink(isActive)}> <li>To do List</li></NavLink>
        </ul>
    }
    //if not login
  return (
    <ul className='bg-gray-600 h-15 flex items-center justify-center text-2xl gap-20 text-white shadow-2xl'>
            <NavLink to="/" className={({isActive})=>activeLink(isActive)}> <li>Login</li></NavLink>
            <NavLink to="register" className={({isActive})=>activeLink(isActive)}> <li>Register</li></NavLink>
            <NavLink to="todolist" className={({isActive})=>activeLink(isActive)}> <li>To do List</li></NavLink>
        </ul>
  )
}

export default NavBar