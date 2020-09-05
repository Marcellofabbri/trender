const changeViewAction = (lapse, what) => {
  return {
    type: 'CHANGE_VIEW',
    lapse: lapse,
    what: what
  }
}

export const changeView = (lapse, what) => {
  return (dispatch) => {
    dispatch(changeViewAction(lapse, what))
  };
}