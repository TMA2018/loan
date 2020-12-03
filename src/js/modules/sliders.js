export default class Sliders {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children; //все дети на странице
        this.btns = document.querySelectorAll(btns); //может быть более 1й кнопки переключения слайдов
        this.slideIndex = 1;
    }

    showSlides(n) {
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
        } catch (err) {console.error(err);}
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
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
    }
}
