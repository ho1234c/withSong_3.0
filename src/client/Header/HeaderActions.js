import createActions from '../Utils/createAction';

export const HEADER_SCROLL = 'HEADER_SCROLL';
export const HEADER_SHOW = 'HEADER_SHOW';
export const HEADER_HIDE = 'HEADER_HIDE';
export const LIST_OPEN = 'LIST_OPEN';
export const LIST_CLOSE = 'LIST_CLOSE';
export const AUTH_OPEN = 'AUTH_OPEN';
export const AUTH_CLOSE = 'AUTH_CLOSE';

export const header = {
  scroll: direction => createActions(HEADER_SCROLL, { direction }),
  show: () => createActions(HEADER_SHOW),
  hide: () => createActions(HEADER_HIDE)
};

export const listModal = {
  open: () => createActions(LIST_OPEN),
  close: () => createActions(LIST_CLOSE)
};

export const authModal = {
  open: () => createActions(AUTH_OPEN),
  close: () => createActions(AUTH_CLOSE)
};
