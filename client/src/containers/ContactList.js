import React from 'react'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

const token = localStorage.getItem('token')

const ContactList = (props) => {
    const {rooms, url} = props

    let userId
    if(token){
        userId = jwtDecode(token)._id
    }

    const printRooms = () => rooms.map(room => <Link to={`${url}/${room._id}`} key={room._id} className="room">
        {room._id}
    </Link>)
    
    return (
        <div className="contact-list">
            {printRooms()}
        </div>
    )
}

export default ContactList
