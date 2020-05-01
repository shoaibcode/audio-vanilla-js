var playIcon = document.querySelector("#play");
var pauseIcon = document.querySelector("#pause");

var time = document.querySelector(".time");

var loop = document.querySelector(".loop");

var durationTimeline = document.querySelector(".duration-timeline");

//Creating Audio
var audio = new Audio("./car.wav");

function playAndPauseAudio() {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

audio.addEventListener("canplaythrough", function () {
  time.innerHTML = audio.currentTime + " / " + audio.duration;
});

var clearID = 0;
audio.addEventListener("play", function () {
  time.innerHTML = audio.currentTime + " / " + audio.duration;

  clearID = setInterval(function () {
    time.innerHTML = audio.currentTime + " / " + audio.duration;

    // Calculate Percentage
    var percent = (audio.currentTime / audio.duration) * 100;
    durationTimeline.style.width = percent + "%";

    if (percent === 100) {
      durationTimeline.style.width = "0%";
      time.innerHTML = "0" + " / " + audio.duration;
    }
  });
});

audio.addEventListener("pause", function () {
  clearInterval(clearID);
});

audio.addEventListener("ended", function () {
  // Pause HIde
  pauseIcon.style.display = "none";
  // Play Show
  playIcon.style.display = "block";
});

// Create Icons
playIcon.addEventListener("click", playAndPauseAudio);
pauseIcon.addEventListener("click", playAndPauseAudio);

// Create range
var range = document.querySelector(".range");
range.addEventListener("change", function (event) {
  audio.volume = event.target.value;
});

//  loop
loop.addEventListener("click", function () {
  if (audio.loop) {
    // set Audio loop tp false
    audio.loop = false;
    // change loopDOM text to On
    loop.innerHTML = "On";
  } else {
    // set Audio loop tp true
    audio.loop = true;
    loop.innerHTML = "Off";
    // change LoopDOM text to Off
  }
});
