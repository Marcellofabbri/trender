const initState = {
  items: [
    { id: 100, createdAt: '20/08/20', value: 135, unit: 'grams'}
  ],
  charts: [
    { id: 0, createdAt: '2020-01-01T00:00:00', title: '', unit: '', description: '', target: 0 }]
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RETRIEVE_DATA':
      let allItems = action.allItems;
        return {
          ...state,
          items: allItems
        };
      break;
    case 'RETRIEVE_CHARTS':
      let allCharts = action.allCharts;

        return {
          ...state,
          charts: allCharts
        };
      break;
  }
  return state;
}

export default rootReducer;