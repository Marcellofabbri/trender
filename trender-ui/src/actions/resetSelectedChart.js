const resetSelectedChartAction = () => {
  return {
    type: 'RESET_SELECTED_CHART'
  }
}

export const resetSelectedChart = (id) => {
  return (dispatch) => {
    dispatch(resetSelectedChartAction())
  };
}