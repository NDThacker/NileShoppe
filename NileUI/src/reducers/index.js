import { loginReducer, messageReducer } from './login'
import { cartReducer } from './cart'
import { cardProDetailsReducer } from './checkout'
import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session'

export default combineReducers({
  loginReducer,
  messageReducer,
  cartReducer,
  sessionReducer,
  cardProDetailsReducer
})

