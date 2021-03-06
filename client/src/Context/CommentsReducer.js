export default (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return action.payload;

    case "ADD_COMMENT":
      return [...state, action.payload];

    default:
      return state;
  }
};
