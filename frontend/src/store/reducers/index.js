import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'
import { petReducer } from './petReducer'


export const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: userReducer,
  petModule: petReducer

})
