import React from 'react'
import Navbar from '../components/Navbar'
import PostContent from '../components/Post'
import useGet from '../hooks/useGet'

export default function Post(props) {

    const [ post, loading, error ] = useGet(`posts/${props.match.params.id}`,false,{})
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="post-container single">
                <PostContent from="post" loading={loading} post={post}/>
            </div>
        </div>
    )
}
