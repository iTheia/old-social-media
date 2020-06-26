import React,{useEffect} from 'react'
import useGet from '../hooks/useGet'
import Post from '../components/Post'
import Navbar from '../components/Navbar'

export default function Home() {
   
    const [ posts, loading, error, cleanUp ] = useGet('posts/')
    useEffect(() => {
        
        return () => {
            cleanUp()
        }
    }, [])
    const printPosts = () => posts.map(post => <Post key={post._id} post={post}/> )

    return (
        <div className="page home">
            <Navbar/>
            <div className="post-container">
                {printPosts()}
            </div>
        </div>
    )
}
