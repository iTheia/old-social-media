import React,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import useGet from '../hooks/useGet'
import PostContainer from '../containers/Post'
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
            <div className="profile-content">
                <div className="profile-board">
                    <div className="user-image">
                        <img src={require('../components/test.jpg')} alt=""/>
                    </div>
                    <div className="user-info">
                        <UserInfo user={{_id:user._id, userName:user.userName, followers:user.followers}} ></UserInfo>
                        <p className="user-stats">
                            <button className="stat">{user.post.length} posts</button>
                            <button className="stat">{user.followers.length} followers</button>
                            <button className="stat">{user.follows.length} follows</button>
                        </p>
                        <h4>{user.name}</h4>
                        <p>{user.description} </p>
                    </div>
                </div>
                <PostContainer post={user.post}></PostContainer>
            </div>
        </div>
    )
}
