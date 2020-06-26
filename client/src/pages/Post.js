import React from 'react'
import Navbar from '../components/Navbar'
import PostContent from '../components/Post'
import useGet from '../hooks/useGet'
import { useEffect } from 'react'

export default function Post(props) {

    const [ post, loading, error ] = useGet(`posts/${props.match.params.id}`,{})
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="post-container single">
                <PostContent loading={loading} post={post}/>
            </div>
        </div>
    )
}
