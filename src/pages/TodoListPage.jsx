import React, { useEffect, useState } from 'react'
import useUserInfo from '../stores/userInfo'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import LoadingPage from './LoadingPage'

function TodoListPage() {
    const [user, setUser] = useState([])
    const [newlist, setNewList] = useState({
        content: "",
        isdone: ""
    })
    const [loading, setLoading] = useState(true)
    const token = useUserInfo((state) => state.token)
    const navigate = useNavigate()

//   call usertodolist

    useEffect(() => {
        fetchUserTodoList()
    }, [])

    async function fetchUserTodoList() {
        try {
            const res = await axios.get('https://drive-accessible-pictures-send.trycloudflare.com/todosv2', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = res
            setUser(data)
            // console.log(data)
        } catch (error) {
            console.log(error)
            navigate('/')
            toast.error('กรุณาล็อกอิน')
        } finally {
            setLoading(false)
        }
    }

    const hdlChange = (e) => {
        const { name, value } = e.target;
        setNewList((prev) => ({ ...prev, [name]: value }))
    }


    //post new list
    async function hdlSubmitNewList(e) {
        e.preventDefault()
        if (!newlist.content.trim()) {
            return alert("check your input")
        }
        try {
            const res = await axios.post('https://drive-accessible-pictures-send.trycloudflare.com/todos/15', newlist)
            setNewList({ content: "" })
            fetchUserTodoList()
            console.log(res)
            toast.success('เพิ่มรายการสำเร็จ')
        } catch (error) {

        }
    }

    //delete list
    async function hdlDelList(e) {
        try {
            const res = await axios.delete(`https://drive-accessible-pictures-send.trycloudflare.com/todos/15/${e.target.id}`)
            fetchUserTodoList()
            console.log(res)
            toast.success('ลบรายการสำเร็จ')
        } catch (error) {
        }
    }

    //update list
    async function hdlUpdate(e) {
        e.preventDefault()

        if (!newlist.content.trim()) {
            return alert("check your input before edit")
        }

        try {
            console.log(e.target.id)
            const res = await axios.patch(`https://drive-accessible-pictures-send.trycloudflare.com/todos/15/${e.target.id}`, newlist)
            console.log(res)
            fetchUserTodoList()
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            toast.success(`แก้ไขไม่สำเร็จ ${error}`)
            console.log(error)
        }
    }

   
    //content
    if (loading) {
        return (
            <LoadingPage />
        )
    }
    return (
        <>

            <div className="todolistpage h-220 flex justify-center items-center flex-col ">
                <div className="todobox flex flex-col bg-gray-800 text-white  p-8 rounded-md gap-5 w-120 h-100 ">
                    <h1 className='text-3xl'>My Todo</h1>

                    {/* create new todolist */}
                    <form className="newtaskbox " onSubmit={hdlSubmitNewList} >
                        <input type="text" placeholder='new task' name="content" onChange={hdlChange} value={newlist.content} className='w-80.5 mr-10 px-5 selection:bg-none ' />
                        <button className='bg-blue-400 p-1 px-3 rounded-xl mb-3 cursor-pointer active:bg-blue-600'>Add</button>
                        <hr className='text-gray-600' />
                    </form>

                    {/* fieldlist */}
                    <div className="list overflow-auto px-5">
                        {user.map(el => (
                            <div className="list flex justify-between my-5" key={el.id}>

                                <input type="checkbox" name="isdone" onChange={e => hdlChange(e, 'check')} defaultChecked={el.isdone} id={el?.id} />

                                <form className="listcontent w-75 px-5 flex" id={el.id} onSubmit={hdlUpdate}>
                                    <p className='w-50'>{el.content}</p>
                                    <button className='bg-gray-500 px-3 mr- rounded-2xl cursor-pointer ml-10 '>Edit</button>
                                </form>
                                <button className='cursor-pointer text-red-500' id={el.id} onClick={(e) => hdlDelList(e)}>X</button>
                            </div>
                        ))}

                    </div>


                </div>
                {/* <pre className='text-white'>{JSON.stringify(user, null, 2)}</pre>
                <pre className='text-white'>{JSON.stringify(newlist, null, 2)}</pre> */}
            </div>
        </>
    )
}

export default TodoListPage