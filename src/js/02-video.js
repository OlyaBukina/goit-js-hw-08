import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

function onPlay(timeupdate) {
  localStorage.setItem(STORAGE_KEY, timeupdate.seconds);
}

player.on('timeupdate', throttle(onPlay, 1000));

if (localStorage.getItem(STORAGE_KEY)) {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}
