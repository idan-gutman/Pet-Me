import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { PetDetails } from './pages/PetDetails'
import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'
import { SocketsNotification } from './cmps/SocketsNotification'
import { PetApp } from './pages/PetApp'
import { Profile } from './pages/Profile'
import { Explore } from './pages/Explore'
import { LoginSignup } from './pages/LoginSignup'



export function App() {

  return (
    <div className="app flex column">
      <Router>
        <Header />
        <SocketsNotification key={ '2312412' } />
        <main className="main-layout">
          <Switch>
            <Route path="/explore" component={ Explore } />
            <Route path="/profile" component={ Profile } />
            <Route path="/login" component={ LoginSignup } />
            <Route path="/:petId" component={ PetDetails } />
            <Route path="/" component={ PetApp } />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

