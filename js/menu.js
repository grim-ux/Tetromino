document.addEventListener("DOMContentLoaded", function () {
  particlesJS.load('particles-js', 'js/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });

  loadRandomSong();
});

function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * 12) + 1;
  return `song${randomIndex}.mp3`;
}

function loadRandomSong() {
  const randomSong = getRandomSong();
  const audioElement = document.getElementById("background-music");
  audioElement.src = `songs/menu/${randomSong}`;

  audioElement.play();
}




