import React,{useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import useGet from '../hooks/useGet'
import PostContainer from '../containers/Post'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import UserInfo from '../components/UserInfo'

export default function Profile(props) {
    
    const [ user, loading, error, cleanUp  ] = useGet(`users/${props.match.params.id}`,{},true,[props.match.params.id])

    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [props.match.params.id])
    
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className="page profile">
            <Navbar/>
            <Container style={{marginTop:'20px', padding:'0 0%'}}>
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="user-image">
                                <img src={require('../components/test.jpg')} alt=""/>
                            </div>
                        </Col>
                        <Col md={8}>
                            <UserInfo user={{_id:user._id, userName:user.userName, followers:user.followers}} ></UserInfo>
                            
                            <p className="user-stats">
                                <button className="stat">{`${user.post.length} posts`}</button>
                                <button className="stat">{`${user.followers.length} followers`}</button>
                                <button className="stat">{`${user.follows.length} follows`}</button>
                            </p>
                            
                        <h4>{user.name}</h4>
                        </Col>
                    </Row>
                    <p className='d-none d-lg-block'>{user.description} </p>
                </Container>
                <PostContainer post={user.post}></PostContainer>
            </Container>
        </div>
    )
}
