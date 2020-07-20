import React,{useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import useGet from '../hooks/useGet'
import PostContainer from '../containers/Post'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import UserInfo from '../components/UserInfo'

export default function Profile(props) {
    
    const [ user, loading, error, cleanUp  ] = useGet(`users/${props.match.params.id}`,{},true,[props.match.params.id])
    const history = useHistory()
    
    if(error){
        history.push('/notfound')
    }
    
    useEffect(() => {
        if(error){
            history.push('/notfound')
        }
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
            <Container style={{marginTop:'20px'}} className="minor-container">
                <Container >
                    <Row>
                        <Col md={3} className="profile-image"  sm={4}>
                            <div className="user-image">
                                <img src={`/images/${user.avatar}`} alt=""/>
                            </div>
                        </Col>
                        <Col md={8}>
                            <UserInfo user={{_id:user._id, userName:user.userName, followers:user.followers}} ></UserInfo>
                            <Container className="user-stats">
                                <Row>
                                    <Col><button className="stat">{`${user.post.length} posts`}</button></Col>
                                    <Col><button className="stat">{`${user.followers.length} followers`}</button></Col>
                                    <Col><button className="stat">{`${user.follows.length} follows`}</button></Col>
                                </Row>
                             </Container>
                            <h4>{user.name}</h4>
                            <Container>
                                <Row>
                                <p className='d-none d-lg-block'>{user.description}</p>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <PostContainer post={user.post}></PostContainer>
            </Container>
        </div>
    )
}
