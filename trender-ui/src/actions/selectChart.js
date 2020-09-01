const selectChartAction = (id) => {
  return {
    type: 'SELECT_CHART',
    selectedChartId: id
  }
}

export const selectChart = (id) => {
  console.log(selectChartAction(id))
  return (dispatch) => {
    dispatch(selectChartAction(id))
  };
}