export const list = {
  isPlaying: state => state.list.play.isPlaying,
  getPlayingVideo: state => state.list.play,
  getNextVideo: state => {
    const { play, modal } = state.list;
    const preKey = play.key;
    const songInfo = modal.songs.songInfo;

    if(preKey === songInfo.length - 1) {
      return false;
    }

    return songInfo.find(song => song.key === preKey + 1);
  }
};

export const player = {
  isPlaying: state => state.player.play.isPlaying,
  getPlayingVideo: state => state.player.play,
  getNextVideo: state => {
    const { play, modal } = state.list;
    const preKey = play.key;
    const songInfo = modal.songs.songInfo;

    if(preKey === songInfo.length - 1) {
      return false;
    }

    return songInfo.find(song => song.key === preKey + 1);
  }
};
