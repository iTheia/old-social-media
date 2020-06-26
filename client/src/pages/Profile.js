import React from 'react'
import Navbar from '../components/Navbar'
import useGet from '../hooks/useGet'

export default function Profile(props) {

    const token = localStorage.getItem('token')
    
    const [ user, loading, error, cleanUp  ] = useGet(`users/${props.match.params.id}`,{},{
        headers:{
            'x-access-token':token
        }
    })

    return (
        <div className="page profile">
            <Navbar/>
            <div className="profile-board">
                {user.followers}
            </div>
        </div>
    )
}
