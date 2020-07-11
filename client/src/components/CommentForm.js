import React,{ useState } from 'react'
import axios from 'axios'

export default function CommentForm(props) {
    
    const token = localStorage.getItem('token')
    const baseURL = localStorage.getItem('URL')
    
    const [comment, setComment] = useState({
        content:''
    })
    const onChange = async e =>{
        setComment({content:e.target.value})
    }
    const postComment = async e =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${baseURL}posts/${props.post_id}/comments/`, comment,{
                headers:{
                    'x-access-token':token
                }
            })
            setComment({content:''})
            props.addComment(response.data)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="commentForm">
            <input onChange={onChange} onKeyPress={e => e.key === 'Enter'? postComment(e): null} placeholder="Leave a comment" className="input" type="text"/>
            <button onClick={postComment}>Publicar</button>
        </div>
    )
}
