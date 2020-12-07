import Sliders from './sliders';

export default class MainSlider extends Sliders {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        try { 
            if (n < 1) {
                this.slideIndex = this.slides.length; 
            } 
            if (n > this.slides.length) {
                this.slideIndex = 1;
            }

            this.slides.forEach( slide => {
                slide.classList.remove('show');
                slide.classList.add('hide');
                /*if (i == n-1) {
                    slide.classList.remove('hide');
                    slide.classList.add('show');
                }*/
            });
            this.slides[this.slideIndex - 1].classList.remove('hide');
            this.slides[this.slideIndex - 1].classList.add('show');
        } 
        catch(err) {}

        try {
            let hanson = document.querySelector('.hanson');
            hanson.classList.add('hide');
            if (n == 3) {
                setTimeout(() => {
                    hanson.classList.remove('hide');
                    hanson.classList.add('show');
                }, 3000);
            } else {
                hanson.classList.add('shidehow');
                hanson.classList.remove('show');
            }
        } catch (err) {} //console.error(err);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    bindTriggers() {
        this.btns.forEach( btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
                //console.log('click');
            });
            btn.parentNode.previousElementSibling.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
        this.showSlides(this.slideIndex);

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.plusSlides(-1);
            });
        });
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.plusSlides(1);
            });
        });
    }
    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (err) {}
            
            this.bindTriggers();
        } 
    }
}