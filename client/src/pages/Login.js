import React, { useEffect } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import useInput from '../hooks/useInput'

export default function Login() {
    
    const baseURL = localStorage.getItem('URL')
    const token = localStorage.getItem('token')

    const history = useHistory()

    const [ user, bindUser, cleanUp ] = useInput({
        name:'',
        email:'',
        password:''
    })
    useEffect(()=>{
        return () =>cleanUp()
    },[])
    if(token){
        history.push('/')
    }
    
    const login = async e =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${baseURL}signIn`,user)
            localStorage.setItem('token',response.data)
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }
    const register = async e =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${baseURL}signUp`,user)
            localStorage.setItem('token',response.data)
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="">
            <h1>Social Media</h1>
            <input name="name" {...bindUser} type="text"/>
            <input name="email" {...bindUser} type="text"/>
            <input name="password" {...bindUser} type="text"/>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
        </div>
    )
}
