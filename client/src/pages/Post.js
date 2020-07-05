import React,{useEffect} from 'react'
import {Container } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import PostContent from '../components/Post'
import useGet from '../hooks/useGet'

export default function Post(props) {

    const [ post, loading, error ] = useGet(`posts/${props.match.params.id}`,false,{})
    useEffect(()=>{
        
    },[])
    return (
        <div className="page">
            <Navbar></Navbar>
            <Container style={{marginTop:'20px'}} className="minor-container">
                <PostContent from="post" loading={loading} post={post}/>
            </Container>
        </div>
    )
}
