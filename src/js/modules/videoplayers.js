export default class VideoPlayers {
    constructor(triggers, popup) {
        this.btns = document.querySelectorAll(triggers);
        this.popup = document.querySelector(popup);
        this.close = this.popup.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    play() {
        this.btns.forEach( (btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if ( i % 2 == 0 ) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(err){}

            btn.addEventListener('click',() =>{
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    //console.log('play');
                    this.activeBtn = btn;

                    if (document.querySelector('iframe#frame')) {
                        this.popup.style.display = 'flex';
                        if (this.path != btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
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
    
    onPlayerStateChange(state){
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            if (state.data === 0) {
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch (err) {}
    }

    createPlayer(url) {
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            //videoId: 'M7lc1UVf-VE',
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });
        this.popup.style.display = 'flex';
    }

    init () {
        if (this.btns.length > 0) {
            // 2. This code loads the IFrame Player API code asynchronously.
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.play();
            this.closePlayer();
        }
    }
}