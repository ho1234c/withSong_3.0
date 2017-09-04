import createActions from '../utils/createAction';

export const VIDEO_CHANGE = 'VIDEO_CHANGE';
export const VIDEO_END = 'VIDEO_END';

export const video = {
  change: videoId => createActions(VIDEO_CHANGE, { videoId }),
  end: () => createActions(VIDEO_END)
};
