import createActions from '../utils/createAction';

export const HEADER_SCROLL = 'header/HEADER_SCROLL';
export const HEADER_SHOW = 'header/HEADER_SHOW';
export const HEADER_HIDE = 'header/HEADER_HIDE';
export const CHANGE_SEARCH_INPUT = 'header/CHANGE_SEARCH_INPUT';
export const SEARCH_START = 'header/SEARCH_START';
export const SEARCH_END = 'header/SEARCH_END';

export const header = {
  scroll: direction => createActions(HEADER_SCROLL, { direction }),
  show: () => createActions(HEADER_SHOW),
  hide: () => createActions(HEADER_HIDE)
};

export const changeSearchInput = word => createActions(CHANGE_SEARCH_INPUT, { word });

export const search = {
  start: () => createActions(SEARCH_START),
  end: () => createActions(SEARCH_END)
};
