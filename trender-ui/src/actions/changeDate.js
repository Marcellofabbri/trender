const changeDateAction = (newDate) => {
  return {
    type: 'CHANGE_DATE',
    newDate: newDate
  }
}

export const changeDate = (newDate) => {
  return (dispatch) => { dispatch(changeDateAction(newDate))}
}