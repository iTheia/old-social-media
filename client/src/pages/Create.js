import React,{ useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Create = () => {
    
    const [post, setPost] = useState({
        image:'',
        description:''
    })
    const history = useHistory()
    
    const upload = async e =>{
        e.preventDefault()
        try {
            const form = new FormData()
            form.append('image', post.image)
            form.append('description', post.description)
            const response = await axios.post(`${localStorage.getItem('URL')}posts/`,form,{
                headers:{'x-access-token':localStorage.getItem('token')}
            })
            history.push(`/posts/${response.data._id}`)
        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <div>
            <div >
                <input type="file" name="image" id="" onChange={e => setPost({...post, [e.target.name]:e.target.files[0]})} />
                <textarea name="description" onChange={e => setPost({...post, [e.target.name]:e.target.value})} ></textarea>
                <button onClick={upload}>Upload</button>
            </div>
        </div>
    )
}

export default Create
