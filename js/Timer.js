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

        this.el.pause.addEventListener("click", () => {
            togglePlay();
            this.stop();
        });

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
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    static getHTML() {
        return `
            <button id="btn-pause"><i class="fa fa-pause"></i></button>
            <button id="btn-play"><i class="fa fa-play"></i></button>
            <button id="btn-stop"><i class="fa fa-stop"></i></button>
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
                        <input type="text" name="nome" id="nome" placeholder="Nome do jogador">
                    </div>
                    <div>
                        <input type="text" name="wpp" id="wpp" placeholder="WhatsApp">
                    </div>
                    <div>
                        <input type="number" name="qtd" id="qtd" placeholder="EcoPoints">
                    </div>
                    <div>
                        <button type="submit" id="btn-save"><i class="fa fa-save"></i> &nbsp;SALVAR</button>
                    </div>
                </form>
            </div>
        `;
    }
}