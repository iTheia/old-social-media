import React from 'react'
import {Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import useGet from '../hooks/useGet'
import Navbar from '../components/Navbar'
import PostContent from '../components/Post'
import RelatedPost from '../containers/Post'

export default function Post(props) {

    const [ data, loading, error ] = useGet(`posts/${props.match.params.id}`,false,{})
    const history = useHistory()
    

    if(error){
        history.push('/notfound')
    }
    return (
        <div className="page">
            <Navbar></Navbar>
            <Container style={{marginTop:'20px'}} className="minor-container">
                <PostContent from="post" loading={loading} post={data.post}/>
            </Container>
            <Container>
                <RelatedPost loading={loading} post={data.relatedPost}></RelatedPost>
            </Container>
        </div>
    )
}
