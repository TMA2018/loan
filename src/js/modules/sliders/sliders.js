export default class Sliders {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate = false,
        autoplay = false
        } = {}) {
        this.container = document.querySelector(container);
        try {
            this.slides = this.container.children; //все дети на странице
        } catch (err) {}
        this.btns = document.querySelectorAll(btns); //может быть более 1й кнопки переключения слайдов
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }

    
}
