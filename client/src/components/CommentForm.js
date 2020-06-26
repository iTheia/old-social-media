import React from 'react'
import axios from 'axios'
import useInput from '../hooks/useInput'

export default function CommentForm(props) {
    
    const token = localStorage.getItem('token')
    const baseURL = localStorage.getItem('URL')

    const [comment, bindComment] = useInput({
        content:''
    })

    const postComment = async () =>{
        try {
            await axios.post(`${baseURL}comments`)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="commentForm">
            <input placeholder="Leave a comment" className="input" type="text"/>
            <button>Publicar</button>
        </div>
    )
}
