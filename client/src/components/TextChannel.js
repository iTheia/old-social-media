import React,{ useEffect, useState }  from 'react'
import io from 'socket.io-client'

let socket 
const ENDPOINT = 'http://localhost:5000/'

const TextChannel = (props) => {
    const { room } = props.match.params

    useEffect(()=>{
        socket = io(ENDPOINT)
    },[])

    return (
        <div>
            qwe
        </div>
    )
}

export default TextChannel
