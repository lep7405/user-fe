import React from 'react'
import "./Menu.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOutAction } from '../redux/authSlice'
import { NavLink } from 'react-router-dom'
const Menu = ({ id ,setOpenProps}) => {
    const navigate=useNavigate()
    const [open,setOpen]=setOpenProps
    const dispatch = useDispatch()
    const handleLogout = () => {       
        setOpen(false)
        dispatch(logOutAction({ _id: id }))
        navigate('/')
    }
    const handle = () => {       
        setOpen(false)
        navigate('/billdetail')
    }
    return (
        <div className='flex flex-col absolute Menu' onClick={() => { setOpen(false); }}>
            <ul className='flex flex-col gap-4 dropMenu items-center'>
            <button onClick={() => handle()}>All bill</button>

                <button onClick={() => handleLogout()}>Log out</button>
            </ul>
        </div>
    )
}

export default Menu
