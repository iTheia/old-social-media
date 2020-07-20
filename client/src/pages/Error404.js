import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Container } from 'react-bootstrap'

const Error404 = () => {
    return (
        <div className="page error404">
            <Navbar/>
            <Container style={{marginTop:'20px'}}>
            <div className="flex" style={{flexDirection:'column'}}>
                <h1>This page is not available.</h1>
                <p>
                    The link you selected may be broken or the page may have been removed. <Link to="/" style={{color:'#0095f6'}}> Back to Home</Link>
                </p>
            </div>
            </Container>
            
        </div>
    )
}

export default Error404
