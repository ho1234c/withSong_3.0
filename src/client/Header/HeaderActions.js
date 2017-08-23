import createActions from '../Utils/createAction';

export const HEADER_HIDE = "HEADER_HIDE";
export const HEADER_SHOW = "HEADER_SHOW";
export const LIST_OPEN = "LIST_OPEN";
export const LIST_CLOSE = "LIST_CLOSE";
export const AUTH_OPEN = "AUTH_OPEN";
export const AUTH_CLOSE = "AUTH_CLOSE";

export const header = {
  hide: () => createActions(HEADER_HIDE),
  show: () => createActions(HEADER_SHOW)
}

export const listModal = {
  open: () => createActions(LIST_OPEN),
  close: () => createActions(LIST_CLOSE)
}

export const authModal = {
  open: () => createActions(AUTH_OPEN),
  close: () => createActions(AUTH_CLOSE)
}