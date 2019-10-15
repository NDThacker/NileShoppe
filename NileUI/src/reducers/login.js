import { STORE_DATA_OF_VISITOR, SET_MESSAGE, UPDATE_USER_DATA, LOG_OUT } from '../actions'

export const loginReducer = (state = { userData: [], userType: '' }, action) => {
  switch (action.type) {

    case STORE_DATA_OF_VISITOR:
      state.userData = action.data;
      if (action.data.id && action.data.id.startsWith('C')) state.userType = 'customer'
      else if (action.data.id && action.data.id.startsWith('S') ) state.userType = 'seller'
      else state.userType = ''
      return state

    case LOG_OUT:
      return {userData: [], userType: ''}

    default:
      return state
  }
}

export const messageReducer = (state = { successMessage: '', errorMessage: '' }, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        successMessage: action.successMessage,
        errorMessage: action.errorMessage
      }
    default:
      return state
  }
}
