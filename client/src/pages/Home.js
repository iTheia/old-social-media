import React,{useEffect} from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import useGet from '../hooks/useGet'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

export default function Home() {
   
    const [ posts, loading, error,cleanUp ] = useGet('posts/')
    const [user, loadingUser, errorUser, cleanUpUser] = useGet('users/',{},true)

    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [])

    const printPosts = () => posts.map(post => <Post from={"home"} key={post._id} post={post}/> )

    return (
        <div className="page home">
            <Navbar/>
            <Container style={{marginTop:'20px'}}>
                <Row>
                    <Col sm={12} lg={8} >{printPosts()}</Col>
                    <Col className='d-none d-lg-block'>
                        <Card style={{padding:'5px'}}>
                            <div className="flex">
                                <img src={`/images/${user.avatar}`} className="icon icon-home" alt=""/>
                                <span>{user.name}</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
