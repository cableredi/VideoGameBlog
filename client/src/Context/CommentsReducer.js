export default (state, action) => {
    switch (action.type) {
      case "SET_COMMENTS":
        return action.payload;
  
      case "UPDATE_COMMENT":
  
  
        return state;
  
      default:
        return state;
    }
  };