import* as ActionTypes from'./HeaderActions';

const headerState = {
  isShow: true,
  listModal: { isLoading: false, isShow: false },
  authModal: { isShow: false }
};

export default (state = headerState, action) => {
  switch(action.type) {
    case ActionTypes.HEADER_HIDE:
      return{
        ...state,
        isShow: false
      };
    case ActionTypes.HEADER_SHOW:
      return{
        ...state,
        isShow: true
      };
    default:
      return state;
  }
};
