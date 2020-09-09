const initState = {
  authError: null,
  loggedIn: false,
  username: null
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
    return {
      ...state,
      authError: null,
      loggedIn: true,
      username: action.username
    }
    break;
    case 'SIGN_OUT':
    return {
      ...state,
      loggedIn: false,
      username: null
    }
    break;
    default:
    return state;
  }
}

export default authReducer;