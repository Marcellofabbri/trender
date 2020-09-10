import axios from 'axios';

const retrieveChartsAction = (json) => {
  console.log('JSON', json)
  return {
    type: 'RETRIEVE_CHARTS',
    allCharts: json
  }
}

export const retrieveCharts = () => {
  return (dispatch) => {
    fetch("/api/charts")
      .then(results => results.json())
      .then((json) => { dispatch(retrieveChartsAction(json));
      })
      .catch((err) => {
        console.log('ERROR WHEN RETRIEVING CHARTS FROM DATABASE', err)
      })
  };
}