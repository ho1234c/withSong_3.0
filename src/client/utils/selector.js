export const album = {
  isPlaying: state => state.album.play.isPlaying,
  getPlayingVideo: state => state.album.play,
  getNextVideo: (state) => {
    const { play, modal } = state.album;
    const preKey = play.key;
    const { contents } = modal.album;

    if (preKey === contents.length - 1) {
      return false;
    }

    return contents.find(data => data.key === preKey + 1);
  }
};

export const player = {
  isPlaying: state => state.player.play.isPlaying,
  getPlayingVideo: state => state.player.play,
  getNextVideo: (state) => {
    const { play, song } = state.player;
    const preKey = play.key;
    const { contents } = song.album;

    if (preKey === contents.length - 1) {
      return false;
    }

    return contents.find(data => data.key === preKey + 1);
  }
};
