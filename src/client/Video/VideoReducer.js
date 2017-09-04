import * as ActionTypes from './VideoActions';

const videoState = {
  videoId: ''
};

export default (state = videoState, action) => {
  switch(action.type) {
    case ActionTypes.VIDEO_CHANGE:
      return {
        videoId: action.payload.videoId
      };
    default:
      return state;
  }
};
