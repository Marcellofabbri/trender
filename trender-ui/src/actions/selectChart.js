const selectChartAction = (id) => {
  return {
    type: 'SELECT_CHART',
    selectedChartId: id
  }
}

export const selectChart = (id) => {
  return (dispatch) => { dispatch(selectChartAction(id)) };
}