import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as listActions from './ListActions';
import * as videoActions from '../Video/VideoActions';
import { play as playerPlay } from '../Player/PlayerActions';
import { list, player } from '../utils/selector';
import * as listSaga from './ListSaga';
import { cloneableGenerator } from 'redux-saga/utils';

const fakeResource = { resource: '' };

describe('ListSaga', () => {
  describe('when getList request event occurs, list is retrieved from server', () => {
    const fakeAction = listActions.getList.request();
    const watchGen = listSaga.watchGetList();
    const gen = listSaga.getList(fakeAction);

    it('takes every getList action', () => {
      expect(watchGen.next().value)
        .toEqual(takeEvery(listActions.LIST_REQUEST, listSaga.getList));
    });

    it('call fetch song when action occurs', () => {
      expect(gen.next().value)
        .toEqual(call(fetchList, fakeAction.payload));
    });

    it('put a action for success of list request', () => {
      expect(gen.next({ data: fakeResource }).value)
        .toEqual(put(listActions.getList.success(fakeResource)));
    });

    it('done', () => {
      expect(gen.next().done).toBe(true);
    });
  })

  describe('when getSong request event occurs, song is retrieved from server', () => {
    const fakeAction = listActions.getSong.request();
    const watchGen = listSaga.watchGetSong();
    const gen = listSaga.getSong(fakeAction);

    it('takes every getSong action', () => {
      expect(watchGen.next().value)
        .toEqual(takeEvery(listActions.SONG_REQUEST, listSaga.getSong));
    });

    it('select video that is current playing', () => {
      expect(gen.next().value)
        .toEqual(select(list.getPlayingVideo));
    });

    it('call fetch song when action occurs', () => {
      expect(gen.next().value)
        .toEqual(call(fetchSong, fakeAction.payload));
    });

    it('put a action for success of song request', () => {
      expect(gen.next({ data: fakeResource }).value)
        .toEqual(put(listActions.getSong.success(fakeResource, false)));
    });

    it('done', () => {
      expect(gen.next().done).toBe(true);
    });
  })

  describe('when playSong event occurs, play song', () => {
    const fakeAction = listActions.play.start();
    const watchGen = listSaga.watchPlaySong();
    const gen = listSaga.playSong(fakeAction);

    it('takes every playSong action', () => {
      expect(watchGen.next().value)
        .toEqual(takeEvery(listActions.PLAY_START, listSaga.playSong));
    });

    it('select whether "Player" is currently playing', () => {
      expect(gen.next().value)
        .toEqual(select(player.isPlaying));
    });

    it('if it is playing in "Player", stop current video', () => {
      expect(gen.next(true).value)
        .toEqual(put(playerPlay.stop()));
    });

    it('and, play selected video', () => {
      expect(gen.next().value)
        .toEqual(put(videoActions.video.change()));
    });

    it('done', () => {
      expect(gen.next().done).toBe(true);
    });
  })

  describe('when VideoEnd event occurs, play next song in list', () => {
    const data = {}
    data.gen = cloneableGenerator(listSaga.nextPlayFlow)();

    it('takes Video end action', () => {
      expect(data.gen.next().value)
        .toEqual(take(videoActions.VIDEO_END));
    });

    it('select whether "List" is currently playing', () => {
      expect(data.gen.next().value)
        .toEqual(select(list.isPlaying));
    });

    it('if state of "List" is not playing, return to waiting for the video action.', () => {
      data.clone = data.gen.clone(); // branching to what is playing
      expect(data.clone.next(false).value)
        .toEqual(take(videoActions.VIDEO_END));
    });

    it('if state of "List" is playing, following are performed.', () => {
      data.clone = data.gen.clone(); // branching to last video
      expect(data.gen.next(true).value)
        .toEqual(select(list.getNextVideo));
    });

    it('if this video is not last, start next video', () => {
      const fakeData = { videoId: true, key: true };

      expect(data.gen.next(fakeData).value)
        .toEqual(put(listActions.play.start(true, true)));
      expect(data.gen.next().value)
        .toEqual(put(videoActions.video.change(true)));
    });

    it('done, waiting for the video action', () => {
      expect(data.clone.next().value)
        .toEqual(take(videoActions.VIDEO_END));
      expect(data.gen.next().value)
        .toEqual(take(videoActions.VIDEO_END));
    });
  });
});