import { cargarHeader } from "./funcionalidades-header.js";
// import { cargarClima } from "./funcionalidad-tarjeta-clima.js"; // descomenta cuando exista el archivo

cargarHeader();
// cargarClima();

/* =========================================================
   1. Apertura de modales por hash en la URL
   ========================================================= */

const modalesPorHash = {
  "#modal-sketch": "modal-sketch",
  "#modal-neme": "modal-neme",
  "#modal-tierra-deportiva": "modal-tierra-deportiva",
  "#modal-portafolio": "modal-portafolio",
  "#modal-menu-sketch": "modal-menu-sketch"
};

function abrirModalDesdeHash() {
  const idModal = modalesPorHash[window.location.hash];
  if (!idModal) return;

  const elemento = document.getElementById(idModal);
  if (!elemento) return;

  const modal = bootstrap.Modal.getOrCreateInstance(elemento);
  modal.show();

  elemento.addEventListener(
    "hidden.bs.modal",
    () => {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    },
    { once: true }
  );
}

/* =========================================================
   2. Apertura de modales por click en botones
   ========================================================= */

function abrirModalesPorClick() {
  document.querySelectorAll("[data-modal]").forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();
      const idModal = boton.dataset.modal;
      const elemento = document.getElementById(idModal);
      if (!elemento) {
        console.warn("No existe el modal:", idModal);
        return;
      }
      const modal = bootstrap.Modal.getOrCreateInstance(elemento);
      modal.show();
    });
  });
}

/* =========================================================
   3. Inicialización
   ========================================================= */

function inicializar() {
  abrirModalDesdeHash();
  abrirModalesPorClick();
  window.addEventListener("hashchange", abrirModalDesdeHash);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}