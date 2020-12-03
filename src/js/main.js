import Sliders from './modules/sliders';
import VideoPlayers from './modules/videoplayers';

window.addEventListener('DOMContentLoaded', () => {

    const slider = new Sliders ('.page', '.next');
    const player = new VideoPlayers('.play','.overlay');

    slider.render();
    player.init();
});