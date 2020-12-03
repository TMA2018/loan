export default class VideoPlayers {
    constructor(triggers, popup) {
        this.btns = document.querySelectorAll(triggers);
        this.popup = document.querySelector(popup);
        this.close = this.popup.querySelector('.close');
    }

    play() {
        this.btns.forEach( btn => {
            btn.addEventListener('click',() =>{
                //console.log('play');
                if (document.querySelector('iframe#frame')) {
                    this.popup.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }
   
    closePlayer() {
        this.close.addEventListener('click', () => {
            this.popup.style.display = 'none';
            this.player.stopVideo();
        });
    }
    

    createPlayer(url) {
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
            //videoId: 'M7lc1UVf-VE',
            /*events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }*/
        });
        this.popup.style.display = 'flex';
    }

    init () {
        // 2. This code loads the IFrame Player API code asynchronously.
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.play();
        this.closePlayer();
    }
}