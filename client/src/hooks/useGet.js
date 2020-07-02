import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGet(url, state=[],useToken=false, reRender =[],config={headers:{}}) {
    
    const [data, setData] = useState(state)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const baseURL = localStorage.getItem('URL')
    const token = localStorage.getItem('token')
    
    if(useToken){ 
        config.headers['x-access-token'] = token
    }

    const fetchData = async () =>{
        const fetchUrl = baseURL + url
        try {
            const response = await axios.get(fetchUrl,config)
            setData(response.data)
            setLoading(false)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(()=>{
        setLoading(true)
        fetchData()
    },reRender)
    
    const cleanUp = () =>{
        setData(state)
    }

    return [data, loading, error, cleanUp]
}
