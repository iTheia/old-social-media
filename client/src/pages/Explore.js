import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/Navbar'


export default function Explore(props) {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        fetchPosts()
        return () => {
            setPosts([])
        }
    }, [])
    const fetchPosts = async () =>{
        try {
            const response = await axios.get(`${localStorage.getItem('URL')}posts/explore`)
            setPosts(response.data)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="page">
            <Navbar/>
            <Container style={{marginTop:'20px',flexWrap:'wrap'}}>
                    {posts.map(post =>{
                        return <Row>
                            <Col>
                                <Link to={`/posts/${post._id}`} style={{width:''}}>
                                    <img src={`/images/${post.media}`} alt="" style={{maxWidth:'100%'}}/>
                                </Link>
                            </Col>
                        </Row>
                    })}
            </Container>
        </div>
    )
}
