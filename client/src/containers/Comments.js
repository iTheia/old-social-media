import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import CommentForm  from '../components/CommentForm'

const Comments = (props) => {
    const { from, post_id } = props
    const [comments, setComments] = useState([])
   
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

    const printComments = () => comments.map((comment) => <div key={comment._id}>
        {comment.content}
    </div>)
    
    return (
        <div className="comments-container">
            {
                printComments()
            }
            <CommentForm></CommentForm>
        </div>
    )
}

export default Comments
