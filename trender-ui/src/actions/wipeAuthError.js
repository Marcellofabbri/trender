export const wipeAuthError = (dispatch) => {
  return (dispatch) => { dispatch({ type: 'WIPE_AUTH_ERROR' })}
}