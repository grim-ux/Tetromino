// Obtener elementos del DOM
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.querySelector(".close");

// Abrir el modal
openModalButton.addEventListener("click", function () {
  modal.style.display = "block";
});

// Cerrar el modal al hacer clic en la "X"
closeModalButton.addEventListener("click", function () {
  modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
