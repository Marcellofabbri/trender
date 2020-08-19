const initState = {
  items: [
    { id: 100, createdAt: '20/08/20', value: 135, unit: 'grams'}
  ]
}

const rootReducer = (state = initState, action) => {
  if (action.type == 'RETRIEVE_DATA') {
    let allItems = action.allItems;
    return {
      items: allItems
    };
  }
  return state;
}

export default rootReducer;