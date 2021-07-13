import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onExplore } from '../store/actions/userActions'

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _LoginSignup extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.onExplore()
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    // console.log("🚀 ~ file: LoginSignup.jsx ~ line 57 ~ _LoginSignup ~ userCreds", userCreds)
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
    this.props.history.push(`/`)
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }
  render() {

    // console.log('users',this.props.users);

    let signupSection = (
      <form className="frm signup" onSubmit={this.doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <br />
        <button>Signup</button>
      </form>
    )
    let loginSection = (
      <form className="frm login" onSubmit={this.doLogin}>
        <h2>Login</h2>
        <select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users && this.props.users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        </select>
        <button>Login</button>
      </form>
    )

    const { loggedInUser } = this.props
    return (
      <div className="login">
        <p>{this.state.msg}</p>
        {loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.fullname}
              <button onClick={() => this.props.logout(loggedInUser._id)}>Logout</button>
            </h3>
          </div>
        )}
        {!loggedInUser && loginSection}
        {!loggedInUser && signupSection}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
  onExplore
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
