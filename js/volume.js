// Función para configurar el control de volumen
function setupVolumeControl() {
  // Obtener el elemento de audio
  const audioElement = document.getElementById("background-music");

  // Crear el control de volumen dinámicamente
  const volumeControlDiv = document.createElement("div");
  volumeControlDiv.id = "volume-control";
  volumeControlDiv.style.position = "fixed";
  volumeControlDiv.style.bottom = "20px";
  volumeControlDiv.style.right = "20px";
  volumeControlDiv.style.display = "flex";
  volumeControlDiv.style.alignItems = "center";
  volumeControlDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  volumeControlDiv.style.padding = "10px";
  volumeControlDiv.style.borderRadius = "5px";
  volumeControlDiv.style.color = "white";
  volumeControlDiv.style.fontFamily = "'Unbounded', sans-serif";
  volumeControlDiv.style.fontSize = "14px";

  // Agregar etiqueta y slider
  volumeControlDiv.innerHTML = `
    <span>Volume:</span>
    <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="1" style="width: 100px; margin-left: 10px;">
  `;

  // Añadir el control al cuerpo del documento
  document.body.appendChild(volumeControlDiv);

  // Obtener el slider de volumen
  const volumeSlider = document.getElementById("volume-slider");

  // Actualizar el volumen cuando se mueve el control
  volumeSlider.addEventListener("input", function () {
    const volume = parseFloat(volumeSlider.value); // Obtener el valor del slider
    audioElement.volume = volume; // Aplicar el volumen al audio
  });
}
