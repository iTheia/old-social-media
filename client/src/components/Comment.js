import React, {useState} from 'react'
import jwtDecode from 'jwt-decode'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const token = localStorage.getItem('token')
const url = localStorage.getItem('URL')

const Comment = (props) => {
    const { comment, deleteC, post_id } = props

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const deleteComment = async () =>{
        try {
            await axios.delete(`${url}posts/${post_id}/comments/${comment._id}`,{headers:{'x-access-token':token}})
            deleteC(comment._id)
        } catch (error) {
            console.log(error)
        }
    }
    const printOptionButton = () =>{
        if(!token) return
        const user = jwtDecode(token)
        if(user._id !== comment.author._id)return
        return <React.Fragment>
            <button className="options__button" onClick={handleShow} style={{width:'20px'}}>
                <img src="/images/more.png" alt=""/>
            </button>
            <Modal size="sm" show={show} onHide={handleClose} animation={false}>
                <Modal.Body >
                    <Container style={{padding:'0'}}>
                        <Col style={{padding:'0'}}>
                            <Row className="post-modal-row" onClick={deleteComment}>Delete comment</Row>
                            <Row className="post-modal-row" onClick={handleClose}>Close</Row>
                        </Col>
                    </Container>
                </Modal.Body>
            </Modal>
        </React.Fragment> 
    }
    return <div className="comment">
        <span><strong>{comment.author.userName}</strong> {comment.content}</span>
        {printOptionButton()}
    </div>
}

export default Comment
