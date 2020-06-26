import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component:Component, ...rest}) => {
    const token = localStorage.getItem('token')
    
    if(!token){
        return <Redirect to="/login"/>
    }
    
    return <Route
        {...rest}
        render={props => <Component {...props} />}
    />
}

export default ProtectedRoute