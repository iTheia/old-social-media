import React,{ useState, useEffect } from 'react'

import { Route, Switch } from 'react-router-dom'
import { Container, Row, Col , Modal, Button  } from 'react-bootstrap'
import axios from 'axios'
import ContactList from '../containers/ContactList'
import Navbar from '../components/Navbar'
import TextChannel from '../components/TextChannel'
import Inbox from '../components/Inbox'

const token = localStorage.getItem('token')
const baseURL = localStorage.getItem('URL')
export default function Messages(props) {

    const [show, setShow] = useState(false);
    const [follows, setFollows] = useState([])
    const [rooms, setRooms] = useState([])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getFollows()
        getRooms()
    }, [])

    const getFollows = async () =>{
        try {
            const response = await axios.get(`${baseURL}users/getParam/follows`,{
                headers:{'x-access-token':token}
            })
            setFollows(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getRooms = async () =>{
        try {
            const response = await axios.get(`${baseURL}messages/`,{
                headers:{'x-access-token':token}
            })
            setRooms(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printFollows = () => follows.map(follow =><Container key={follow._id}>
        <Row>
            <Col md={8} style={{padding:'0 5px'}}>
                <div className="flex">
                    <span className="icon"><img src={`/images/${follow.avatar}`} alt=""/></span> 
                    <span style={{marginLeft:'5px'}}>{follow.userName}</span>
                </div>
            </Col>
            <Col style={{padding:'0 5px'}}>
                <Button variant="primary">Start new Chat</Button>
            </Col>
        </Row>
    </Container>)

    return (
        <div className="page">
            <Navbar></Navbar>
            <Container  className="messages-container">
                
                <Row style={{height:'100%'}}>
                    <Col md={4} style={{padding:'0'}}>
                        <header className="inbox-header">
                            <div></div>
                            <div className="strong">Direct</div>
                            <button className="new-message" onClick={handleShow}>
                                <svg aria-label="Nuevo mensaje" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 44 44" width="24">
                                    <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
                                    <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
                                </svg>        
                            </button>
                            <Modal size="md" show={show} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <h3>Start a new Chat</h3>
                                </Modal.Header>
                                <Modal.Body >
                                    <Container>
                                        <Row>
                                            <Col style={{padding:'10px'}}>
                                                {printFollows()}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Modal.Body>
                            </Modal>
                        </header>
                        <ContactList url={props.match.url}  rooms={rooms}/>
                    </Col>
                    <Col md={8} style={{padding:'0'}}>
                        <Switch>
                            <Route exact path={`${props.match.url}`} component={Inbox}/>
                            <Route path={`${props.match.url}/:room`} component={TextChannel}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
