const initState = {
  authError: null,
  loggedIn: false,
  username: null,
  userID: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_FAILED':
    return {
      ...state,
      authError: 'Login failed'
    }
    break;
    case 'LOGIN_SUCCESSFUL':
    console.log('logged in')
    return {
      ...state,
      authError: null,
      loggedIn: true,
      username: action.username,
      userID: action.userID
    }
    break;
    case 'SIGN_OUT':
    return {
      ...state,
      loggedIn: false,
      username: null
    }
    break;
    case 'WIPE_AUTH_ERROR':
    return {
      ...state,
      authError: null
    }
    default:
    return state;
  }
}

export default authReducer;