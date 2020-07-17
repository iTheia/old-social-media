import React from 'react'
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem('token')
const userId = jwtDecode(token)._id

const ContactList = (props) => {
    const {rooms} = props
    
    const printRooms = () => rooms.map(room => <div className="room">
        {userId}
    </div>)
    return (
        <div className="contact-list">
            {printRooms()}
        </div>
    )
}

export default ContactList
