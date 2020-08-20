const initState = {
  items: [
    { id: 100, createdAt: '20/08/20', value: 135, unit: 'grams'}
  ]
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

//  if (action.type == 'RETRIEVE_DATA') {
//    let allItems = action.allItems;
//    return {
//      items: allItems
//    };
//  }

  return state;
}

export default rootReducer;