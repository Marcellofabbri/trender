const signOutAction = () => {
  return {
    type: 'SIGN_OUT'
  }
}

export const signOut = () => {
  return (dispatch) =>  dispatch(signOutAction());
}