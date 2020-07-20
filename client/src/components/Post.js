import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Modal, Row, Col, Container} from 'react-bootstrap'
import Comments from '../containers/Comments'

const baseClip = localStorage.getItem('Clip')

export default function Post(props) {
    
    const { loading, post, from } = props

    const history = useHistory()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const copyToClipBoard = () =>{
        const url = `${baseClip}/posts/${post._id}`
        const dummy = document.createElement('input')
        document.body.appendChild(dummy)
        dummy.value = url
        dummy.select()
        document.execCommand('copy')
        document.body.removeChild(dummy);
        handleClose()
    }
    const goToPost = () =>{
        handleClose()
        history.push(`/posts/${post._id}`)
    }

    const Header = () => <header>
        <Link to={`/profiles/${post.author._id}`} className="post__author-info">
            <img className="author__image" src={`/images/${post.author.avatar}`} alt=""/>
            <label>{post.author.name}</label>
        </Link>
        <div className="options">
            <button className="options__button" onClick={handleShow}>
                <img src="/images/more.png" alt=""/>
            </button>
            <Modal size="sm" show={show} onHide={handleClose} animation={false}>
                <Modal.Body >
                    <Container style={{padding:'0'}}>
                        <Col style={{padding:'0'}}>
                            <Row className="post-modal-row" onClick={copyToClipBoard}>Copy Link</Row>
                            <Row className="post-modal-row" onClick={goToPost}>Go to post</Row>
                            <Row className="post-modal-row" onClick={handleClose}>Close</Row>
                        </Col>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    </header>

    const PostMedia = () => <div className="post__media">
        <img className="post-image" src={`/images/${post.media}`} alt=""/>
    </div>
    if(loading){
        return <article className="post blank" style={{height:'400px'}}></article>
    }

    if(from ==="post"){
        return <Container  className="post" >
            <Row>
                <Col md={8}id="post" style={{
                    margin:0,
                    padding:0
                }}>
                    {PostMedia()}
                </Col>
                <Col>

                    <Row>{Header()}</Row>
                    <Row className="comments-row"><Comments from={from} post_id={post._id} comments={post.comments}></Comments></Row>
                </Col>
            </Row>
        </Container>
    }

    return <article className="post">
        {Header()}
        {PostMedia()}
        <div className="post__footer">
            <div className="post__footer-info">
                <div className="actions">
                    <button  className={`action`}>
                        <svg aria-label="Me gusta" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"/>
                        </svg>
                    </button>
                    <Link className="action" to={`/posts/${post._id}`}>
                        <svg aria-label="Comentar" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"/>    
                        </svg>
                    </Link>
                </div>
                <button className="likes">{post.likes.length} Likes</button>
            </div>
            <p className="description">{post.description}</p>
        </div>
        <Comments from={from} post_id={post._id} comments={post.comments}></Comments>
    </article>
}
