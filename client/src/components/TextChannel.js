import React,{ useEffect, useState }  from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import useGet from '../hooks/useGet'
import {Container, Row, Col} from 'react-bootstrap'

let socket 
const ENDPOINT = 'http://localhost:5000/'
const URL = localStorage.getItem('URL')
const token = localStorage.getItem('token')

const TextChannel = (props) => {
    const { room } = props.match.params

    const _id = jwtDecode(token)._id

    const [message, setMessage] = useState('')
    const [messages, setMesages] = useState([])
    const [page, setPage] = useState(0)
    const [chat, loading] =useGet(`messages/${room}`,{},true)

    
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('join',{room}, () => {})
        getMessages()
    },[room, ENDPOINT])

    useEffect(()=>{
        socket.on('message', ({content, author}) => {
            setMesages(messages => [...messages, {content, author}])
        })
    },[])

    const getMessages = async () =>{
        try {
            const response = await axios.get(`${URL}messages/${room}/message`,{headers:{'x-access-token':token, page}})
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const sendMessage = async e =>{
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', {
                content:message,
                author:_id
            }, () => setMessage(''))
        }
    }

    if(loading){
        return <div className='message-area'></div>
    }
    return (
        <div className='message-area'>
            <header className="inbox-header">
                <div className="icon"></div>
            </header>
            <Container className="message-container">
                <Col>
                    {messages.map((message, index) => <div key={index}>
                        {message.content}
                    </div>)}
                </Col>
            </Container>
            <input type="text"
                name="content"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter'? sendMessage(e) :null}
            />
            <button onClick={()=>console.log(messages,chat)}>messages</button>
        </div>
    )
}

export default TextChannel
