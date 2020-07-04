import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import Create from './pages/Create'

export default function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute  exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/messages" component={Messages} />
        <ProtectedRoute path="/explore" component={Explore}/>
        <Route path="/profiles/:id" component={Profile} />
        <Route path="/posts/:id" component={Post} />
        <ProtectedRoute path="/create" component={Create}  />
      </Switch>
    </Router>
  )
}