import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGet(url, state=[],config={}) {
    
    const [data, setData] = useState(state)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const baseURL = localStorage.getItem('URL')

    const fetchData = async () =>{
        try {
            const response = await axios.get(`${baseURL}${url}`,config)
            setData(response.data)
            setLoading(false)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return [data, loading, error]
}
