export default class Download{
    constructor (triggers) {
        this.btns = document.querySelectorAll(triggers); 
        this.path = './assets/img/Bitmap.jpg';
    }

    downloadItem(path) {
        const link = document.createElement('a');
        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_picture');

        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    init() {
        this.btns.forEach( btn => {
            btn.addEventListener('click',() => {
                this.downloadItem(this.path);
            });
        });
    }
}