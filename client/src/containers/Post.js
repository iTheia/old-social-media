import React from 'react'
import useGet from '../hooks/useGet'

export default function Post() {
    const [ posts, loading, error ] = useGet('posts/')
    
    const printPosts = () =>{
        posts.map(post => <h1>{post.description}</h1>)
    }
    return (
        <div>
            {printPosts()}
        </div>
    )
}
