import { socketService } from '../../services/socketService.js'

let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  users: [],
  userPets: [] //userId => pets
}
if (initialState.loggedInUser) socketService.emit('user-join', initialState.loggedInUser._id)
// else socketService.off('user-join')

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }

    case 'UPDATE_USER':
      console.log('updating user in the reducer', action.user)
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.user._id) {
            if (user._id === state.loggedInUser._id) {
              state.loggedInUser = action.user
            }
            return action.user; //swap the relevant user with updatedUser (action.user)
          }
          return user
        })
      }

    case 'SET_USERS':
      return { ...state, users: action.users }

    case 'SET_USER_PETS':
      return { ...state, userPets: action.users }

    case 'SET_SCORE':
      return { ...state, loggedInUser: { ...state.loggedInUser, score: action.score } }
    default:
      return state
  }


}
