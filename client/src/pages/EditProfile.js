import React, {useState, useEffect} from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'

const token = localStorage.getItem('token')
const url = localStorage.getItem('URL')
const config = {headers:{'x-access-token':token}}

const EditProfile = () => {
    const [user, setuser] = useState({})
    const history = useHistory()
    
    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUser = async () =>{
        try {
            const response = await axios.get(`${url}users/edit`,config)
            response.data.newPassword = ""
            response.imgae = response.avatar
            setuser(response.data)
            
        } catch (error) {
            
        }
    }
    const onChange = e =>{
        let copy = user
        copy[e.target.name] = e.target.value
        setuser(copy)
    }
    const updateData = async e =>{
        e.preventDefault()
        try {
            const form = new FormData()
            form.append('image', user.image)
            form.append('newPassword', user.newPassword)
            form.append('email', user.email)
            form.append('password', user.password)
            form.append('name', user.name)
            await axios.put(`${url}users/`,form,config)
            history.push(`/profiles/${user._id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="page edit-profile">
            <Navbar/>
            <Container className="edit-container">
                <Col>
                <div>
                    <Form.Group>
                        <input type="file"  name="image" id="" onChange={e => setuser({...user, [e.target.name]:e.target.files[0]})}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={onChange} name="email"  type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={onChange} name="name"  type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={onChange} name="password"placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" onChange={onChange} name="newPassword" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={updateData} variant="primary" type="submit">
                        Update
                    </Button>
                    </div>
                </Col>
            </Container>
        </div>
    )
}

export default EditProfile
