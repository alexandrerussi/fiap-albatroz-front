export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            miliseconds: root.querySelector(".timer__part--miliseconds"),
            play: root.querySelector("#btn-play"),
            pause: root.querySelector("#btn-pause"),
            stop: root.querySelector("#btn-stop"),
        }

        var myAudio = document.getElementById("music");
        var isPlaying = false;

        function togglePlay() {
            if (isPlaying) {
                myAudio.pause()
            } else {
                myAudio.play();
            }
        };

        function resetMsc () {
            myAudio.pause();
            myAudio.reset();
        }

        myAudio.onplaying = function() {
            isPlaying = true;
        };
        myAudio.onpause = function() {
            myAudio.currentTime = 0;
            isPlaying = false;
        };
        myAudio.reset = function() {
            myAudio.currentTime = 0;
            isPlaying = false;
        };

        this.interval = null;
        this.remainingSeconds = 61;

        // this.updateInterfaceTime();

        this.el.play.addEventListener("click", () => {
            togglePlay();
            this.start();
        });

        // this.el.pause.addEventListener("click", () => {
        //     togglePlay();
        //     this.stop();
        // });

        this.el.stop.addEventListener("click", () => {
            resetMsc();
            this.stop();
            this.remainingSeconds = 0;
            this.updateInterfaceTime();
            this.remainingSeconds = 61;
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        // const minutes = Math.floor(this.remainingMiliSeconds / (60*1000));
        // const seconds = Math.floor(this.remainingMiliSeconds / 1000) % 60;
        // const miliseconds = this.remainingMiliSeconds % 1000;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
        // this.el.miliseconds.textContent = miliseconds.toString().padStart(2, "0");
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
                this.remainingSeconds = 61;
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    static getHTML() {
        return `
            <!--<button id="btn-pause">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
            </button>-->
            
            <button id="btn-play">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            </button>

            <button id="btn-stop">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https:// fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
            </button>

            <!-- <button id="btn-reset"><i class="fa fa-solid fa-reply"></i></button> -->

            <div class="clock row align-content-center ">
                <div class="col-md-12">
                    <div class="timer__div timer__div--minutes-sec">
                        <span class="timer__part timer__part--minutes">00</span>
                        <span class="timer__part">:</span>
                        <span class="timer__part timer__part--seconds">00</span>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <form action="">
                    <div>
                        <input type="text" name="nome" id="nome" placeholder="Nome do jogador" autocomplete="off" required>
                    </div>
                    <div>
                        <input type="text" name="wpp" id="wpp" placeholder="WhatsApp" autocomplete="off" required>
                    </div>
                    <div>
                        <input type="number" name="qtd" id="qtd" placeholder="EcoPoints" autocomplete="off" required>
                    </div>
                    <div>
                        <button type="submit" id="btn-save">SALVAR</button>
                    </div>
                </form>
            </div>
        `;
    }
}