import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as listActions from './ListActions';
import * as videoActions from '../Video/VideoActions';
import { play as playerPlay } from '../Player/PlayerActions';
import { list, player } from '../utils/selector';
import * as listSaga from './ListSaga';
import { cloneableGenerator } from 'redux-saga/utils';

const fakeResource = { resource: '' };

describe('ListSaga - getList', () => {
  const fakeAction = listActions.getList.request();
  const watchGen = listSaga.watchGetList();
  const gen = listSaga.getList(fakeAction);

  it('takes every getList action', () => {
    expect(watchGen.next().value)
      .toEqual(takeEvery(listActions.LIST_REQUEST, listSaga.getList))
  })

  it('call fetch song when action occurs', () => {
    expect(gen.next().value)
      .toEqual(call(fetchList, fakeAction.payload));
  });

  it('put a action for success of list request', () => {

    expect(gen.next({ data: fakeResource }).value)
      .toEqual(put(listActions.getList.success(fakeResource)));
  });

  it('done', () => {
    expect(gen.next().done).toBe(true)
  });
});

describe('ListSaga - getSong', () => {
  const fakeAction = listActions.getSong.request();
  const watchGen = listSaga.watchGetSong();
  const gen = listSaga.getSong(fakeAction);

  it('takes every getSong action', () => {
    expect(watchGen.next().value)
      .toEqual(takeEvery(listActions.SONG_REQUEST, listSaga.getSong))
  })

  it('select video that is current playing', () => {
    expect(gen.next().value)
      .toEqual(select(list.getPlayingVideo));
  })

  it('call fetch song when action occurs', () => {
    expect(gen.next().value)
      .toEqual(call(fetchSong, fakeAction.payload));
  });

  it('put a action for success of song request', () => {
    expect(gen.next({ data: fakeResource }).value)
      .toEqual(put(listActions.getSong.success(fakeResource, false)));
  });

  it('done', () => {
    expect(gen.next().done).toBe(true)
  });
})

describe('ListSaga - playSong', () => {
  const fakeAction = listActions.play.start();
  const watchGen = listSaga.watchPlaySong();
  const gen = listSaga.playSong(fakeAction);

  it('takes every playSong action', () => {
    expect(watchGen.next().value)
      .toEqual(takeEvery(listActions.PLAY_START, listSaga.playSong))
  })

  it('select whether "Player" is currently playing', () => {
    expect(gen.next().value)
      .toEqual(select(player.isPlaying));
  })

  it('if it is playing in "Player", stop current video', () => {
    expect(gen.next(true).value)
      .toEqual(put(playerPlay.stop()));
  })

  it('and, play selected video', () => {
    expect(gen.next().value)
      .toEqual(put(videoActions.video.change()));
  })

  it('done', () => {
    expect(gen.next().done).toBe(true)
  });
})