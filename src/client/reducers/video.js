import * as ActionTypes from '../containers/Video/actions';

const initialState = {
  videoId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.VIDEO_CHANGE:
      return {
        videoId: action.payload.videoId
      };
    default:
      return state;
  }
};
