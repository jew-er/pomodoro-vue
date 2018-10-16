Vue.component("vue-pomodoro", {
  template: `
  
  <div class="pomodoro" :class="{'pomodoro-color':isWorkTime}">
      <div class="outer-ring">
       <div class="middle-ring">
        <div class="timer-area">

          <div class="timer-tag">
           <p v-show="isWorkTime">work</p>
           <p v-show="!isWorkTime">break</p>
          </div>

          <div class="timer-counter">
            {{minutes}}:{{properSeconds}}
          </div>

        </div>
       </div>
      </div>
      <div class="controls">
          <div @click="reset"class="controls-btn controls-reset"><i class="fas fa-undo"></i></div>
          <div v-show="!running" @click="play" class="controls-btn controls-play"><i class="fas fa-play"></i></div>
          <div v-show="running" @click="pause"class="controls-btn controls-pause"><i class="fas fa-pause"></i></div>
          <div @click="revealInfo"class="controls-btn controls-info"><i class="far fa-question-circle"></i></div>
      </div>

      <div class="extraoptions" :class="{'extraoptions-active': showOptions}" >
          <div @click="openOptions" class="extraoptions-btn-close"><i class="fas fa-times"></i></div>
          <div class="extraoptions-options">
            <p>Set work time</p>
            <p>{{workTime}}</p>
            <input v-model="workTime" class="extraoptions-input" type="range" step="1" min="1" max="120">
            
            <p>Set break break</p>
            <p>{{breakTime}}</p>
            <input v-model="breakTime" class="extraoptions-input" type="range" step="1" min="1" max="60">
          </div>

          <div class="extraoptions-text">
          <p @click="resetToDefault">Reset to defaults</p>
          </div>
      </div>

      <div v-show="!showOptions" class="extraoptions-btn" @click="openOptions"><i class="fas fa-bars"></i></div>
      <div class="info-modal-mist" @click="revealInfo" :class="{'info-modal-mist-active': showModal}">
      <div class="info-modal" :class="{'info-modal-active': showModal}">
        <h2>Pomodoro</h2>
        <p>The pomodoro technique is a time management method that 
        uses a timer to break down work into intervals separated by 
        short breaks.</p>
      </div>
      </div>
  </div>
  
  `,

  data() {
    return {
      workTime: 25, //in minutes
      breakTime: 5, //in minutes
      minutes: 25,
      seconds: 0,
      isWorkTime: true, //1 means pomodoro is counting work time and 0 means break time
      running: false,
      enableExtraOptions: true,
      showModal: false,
      showOptions: false
    };
  },

  methods: {
    //Handles the switch from work
    // when time to break time and back when the timer hits 0:0
    onComplete() {
      if (this.isWorkTime) {
        this.isWorkTime = !this.isWorkTime;
        this.minutes = this.breakTime;
        this.seconds = 0;
      } else {
        this.isWorkTime = !this.isWorkTime;
        this.minutes = this.workTime;
        this.seconds = 0;
      }
    },
    play() {
      this.running = true;
      this.timer = setInterval(() => {
        if (this.minutes == 0 && this.seconds == 0) {
          this.onComplete();
        }
        if (this.seconds == 0) {
          this.seconds = 59;
          this.minutes -= 1;
        } else {
          this.seconds -= 1;
        }
      }, 1000);
    },

    pause() {
      clearInterval(this.timer);
      this.running = false;
    },

    reset() {
      this.isWorkTime = 1;
      this.minutes = this.workTime;
      this.seconds = 0;
    },
    revealInfo() {
      this.showModal = !this.showModal;
    },
    resetToDefault() {
      this.workTime = 25;
      this.breakTime = 5;
    },
    openOptions() {
      this.showOptions = !this.showOptions;
    }
  },
  computed: {
    properSeconds() {
      let x = this.seconds;
      if (x == 0) {
        return "00";
      } else if (x < 10 && x > 0) {
        return "0" + x.toString();
      } else {
        return x;
      }
    }
  }
});

new Vue({
  el: "#root"
});
