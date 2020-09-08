const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_FAILED':
    return {
      ...state,
      authError: 'Login failed'
    }
    case 'LOGIN_SUCCESSFUL':
    return {
      ...state,
      authError: null
    }
    default:
    return state;
  }
}

export default authReducer;