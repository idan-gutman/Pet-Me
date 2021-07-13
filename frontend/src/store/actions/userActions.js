import { userService } from '../../services/userService'
import { socketService } from '../../services/socketService'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
      //for sending new requests
      socketService.on('user-updated', newAdoptReq => {
        console.log(newAdoptReq)
        dispatch({
          type: 'ADD_REQUEST', newAdoptReq
        })

      })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}

export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds)
      // socketService.emit('user-join', user._id)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in login', err)
    }
  }
}

export function getUser(userId) {
  return async dispatch => {
    try {
      const user = await userService.getById(userId)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in login', err)
    }
  }
}

export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.signup(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in signup', err)
    }
  }
}

export function logout(userId) {
  console.log('logout');
  socketService.off('user-join', userId)
  return async dispatch => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}

export function updatedLoggedInUser(userId) {
  return async dispatch => {
    try {
      const user = await userService.updateLoggedInUser(userId)
      dispatch({ type: 'SET_USER', user})
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}

export function newAdoptRequest(data) { // Action Creator
  return async dispatch => {
    try {
      const updatedUser = await userService.saveNewRequest(data)
      const action = {
        type: 'UPDATE_USER',
        user: updatedUser
      }
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export function approveAdopt(data) { // Action Creator
  return async dispatch => {
    const updatedUsers = await userService.saveNewApprove(data)
    // console.log(updatedUsers)
    console.log('updating oldOwner')
    // socketService.emit('update-new-owner', updatedUsers.updatedOwner)
    const action = {
      type: 'UPDATE_USER',
      user: updatedUsers.updatedLoggedInUser
    }
    socketService.emit('approve-requested', data)
    dispatch(action)
  }
}
export function approveAdoptToOwner(newOwner) { // Action Creator
  return async dispatch => {
    const updatedNewOwner = await userService.update(newOwner)
    console.log('updating new-owner-user')
    const action = {
      type: 'UPDATE_USER',
      user: updatedNewOwner
    }
    dispatch(action)
  }
}

export function onExplore() {
  return dispatch => {
    const action = {
      type: 'ON_EXPLORE'
    }
    dispatch(action)
  }
}
export function onHome() {
  return dispatch => {
    const action = {
      type: 'ON_HOME'
    }
    dispatch(action)
  }
}
export function showSearch() {
  return dispatch => {
    const action = {
      type: 'SHOW_SEARCH'
    }
    dispatch(action)
  }
}
export function hideSearch() {
  return dispatch => {
    const action = {
      type: 'NOT_SHOW_SEARCH'
    }
    dispatch(action)
  }
}

