document.addEventListener("DOMContentLoaded", function () {
  particlesJS.load('particles-js', 'js/particles.json', function () {
    console.log('callback - particles.js config loaded');
  });

  // Cargar una canción aleatoria al iniciar la página
  loadRandomSong();

  // Configurar el control de volumen
  setupVolumeControl();
});

// Función para cargar una canción aleatoria
function loadRandomSong() {
  const randomSong = getRandomSong();
  const audioElement = document.getElementById("background-music");
  audioElement.src = `songs/menu/${randomSong}`; // Ajusta la ruta según tu estructura

  audioElement.addEventListener("error", () => {
    console.error(`Error al cargar la canción: ${randomSong}`);
    loadRandomSong(); // Intenta cargar otra canción si falla
  });

  audioElement.play().catch(error => {
    console.error("Error al reproducir la música automáticamente:", error);
  });
}

// Función para mostrar una sección específica
function showSection(sectionId) {
  document.querySelectorAll('.tab-buttons button').forEach(button => {
    button.classList.remove('active');
  });
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  const selectedButton = document.querySelector(`.tab-buttons button[onclick="showSection('${sectionId}')"]`);
  const selectedSection = document.getElementById(`${sectionId}-section`);

  if (selectedButton && selectedSection) {
    selectedButton.classList.add('active');
    selectedSection.classList.add('active');
  }
}

// Función para iniciar el juego
function startGame() {
  alert("Starting the game...");
}

// Función para mostrar configuraciones (opcional)
function showSettings() {
  console.log("Settings panel opened.");
}
