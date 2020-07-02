import React, { useEffect }  from 'react'
import { Link, NavLink } from 'react-router-dom'
import useGet from '../hooks/useGet'

export default function Navbar() {

    const token = localStorage.getItem('token')

    const [user, loading, error, cleanUp] = useGet('users/',{},{
        headers:{
            'x-access-token':token
        }
    })

    useEffect(() => {
        return () =>{
            cleanUp()
        }
    }, [])
    

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <Link to="/">Social Media</Link>
            </div>
            <div className="navbar__list">
                {(!token)? 
                    (<>
                        <Link to={{ pathname:"/login",action:{actionName:'login'}}}>Log In</Link>
                        <Link to={{ pathname:"/login",action:{actionName:'register'}}}>Sign Up</Link>
                    </>):
                    (<>
                        {links.map((link, index) => (
                            <NavLink key={index} exact={(link.path === '/')? true:false}to={link.path} className="nav__link" activeClassName="link__active">
                                {link.svg}
                            </NavLink>))}
                        <Link className="icon" to={`/profiles/${user._id}`} >
                            <img src={require('./test.jpg')} alt=""/>
                        </Link>
                    </>)}
            </div>
        </div>
    )
}


const links =[
    {
        path:'/',
        svg:(
            <svg aria-label="Direct" width="22" height="22" viewBox="0 0 48 48">
                <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
            </svg>
        )
    },
    {
        path:'/messages',
        svg:(
            <svg aria-label="Direct" width="22" height="22" viewBox="0 0 48 48">
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"/>
            </svg>
        )
    },
    {
        path:'/explore',
        svg:(
            <svg aria-label="Direct" width="22" height="22" viewBox="0 0 48 48">
                <path clipRule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fillRule="evenodd"></path>
            </svg>
        )
    }
]
