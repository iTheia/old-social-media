import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from '../components/Navbar'

export default function Messages(props) {
    return (
        <div className="page">
            <Navbar></Navbar>
            <Container style={{height:'100%'}} className="messages-container">
                
            </Container>
        </div>
    )
}
