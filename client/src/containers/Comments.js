import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import {Container} from 'react-bootstrap'
import CommentForm  from '../components/CommentForm'
import jwtDecode from 'jwt-decode'

const Comments = (props) => {
    const { from, post_id } = props
    const [comments, setComments] = useState([])
    const token = localStorage.getItem('token')

    const fetchComments = async () =>{
        if(from === "home"){
            setComments(props.comments)
        }else{
            try {
                const response = await axios.get(`${localStorage.getItem('URL')}posts/${post_id}/comments/`)
                setComments(response.data.comments)
            } catch (error) { 
                alert(error) 
            }
        }
    }

    useEffect(()=>{
        fetchComments()
    },[])
    const addComment = comment => setComments([...comments, comment ])
    
    const printOptionButton = id =>{
        if(!token) return
        const user = jwtDecode(token)
        if(user._id !== id)return
        return <button className="options__button" style={{width:'20px'}}>
            <img src="/images/more.png" alt=""/>
        </button>
    }
    const printComments = () => comments.map((comment) => <div className="comment" key={comment._id}>
            <span>{comment.content}</span>
            {printOptionButton(comment.author)}
    </div>)
    
    return (
        <div className="comments-container">
            <Container>
                {printComments()}
            </Container>
            <CommentForm  addComment={addComment} post_id={post_id}></CommentForm>
        </div>
    )
}

export default Comments
