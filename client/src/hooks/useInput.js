import { useState } from 'react'

export default function useInput(initialState) {

    const [data, setData] = useState(initialState)

    const bind = {
        onChange: e =>{
            let copy = data
            copy[e.target.name] = e.target.value
            setData(copy)
        }
    }
    const cleanUp = () => setData({})
    return [ data, bind,cleanUp ]
}
