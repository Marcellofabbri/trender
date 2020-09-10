import axios from 'axios';

const retrieveDataAction = (json) => {
  return {
    type: 'RETRIEVE_DATA',
    allItems: json
  }
}

// chartIds: array of all chart IDs associated with current logged in user
export const retrieveData = () => {
  return (dispatch) => {
      fetch("api/measurement")
      .then(results => results.json())
      .then((json) => { dispatch(retrieveDataAction(json));
      })
      .catch((err) => {
        console.log('ERROR WHEN RETRIEVING DATA FROM DATABASE', err)
      })
  };
}