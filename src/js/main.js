import Sliders from './modules/sliders/sliders';
import MainSliders from './modules/sliders/slider-main';
import MiniSlider from './modules/sliders/slider-mini';
import VideoPlayers from './modules/videoplayers';
import Difference from './modules/difference';
import Forms from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {

    const mainSlider = new MainSliders ({
        btns: '.next', 
        container: '.page'
    });

    const modulehtmlSlider = new MainSliders ({
        btns: '.next', 
        container: '.moduleapp'
    });

    const miniSlider = new MiniSlider ({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay:true
    });

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active',
    });
    new VideoPlayers('.showup .play','.overlay').init();
    new VideoPlayers('.module__video-item .play','.overlay').init();

    new Forms('.form').init(); 
    //const diff = new Difference();
    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    mainSlider.render();
    modulehtmlSlider.render();
    miniSlider.init();
    modulesSlider.init();
    feedSlider.init();
    //diff.init();
    new ShowInfo('.plus__content').init();
    new Download('.download').init();
});