import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'

export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/"  component={Home}/>
        <Route exact path="/login" component={Login} />
        <Route path="/profiles/:id" component={Profile} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </Router>
  )
}