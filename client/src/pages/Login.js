import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import useInput from '../hooks/useInput'

export default function Login(props) {
    
    const [state, setstate] = useState('login')
    const baseURL = localStorage.getItem('URL')
    const token = localStorage.getItem('token')
    const history = useHistory()
    const [ user, bindUser ] = useInput({
        name:'',
        email:'',
        password:''
    })

    if(token){
        history.push('/')
    }
    useEffect(()=>{
        if(props.location.action !== undefined){
            setstate(props.location.action.actionName)
        }
        return () =>{
            setstate('login')
        }
    },[])
    
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
