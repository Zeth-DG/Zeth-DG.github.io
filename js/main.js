import { cargarHeader } from "./funcionalidades-header.js";
import "./funcionalidad-tarjeta-clima.js"; // Se auto-ejecuta al importarse.

// NOTA: cargarHeader() usa fetch("./componentes/header.html").
// Requiere servidor local (Live Server, python -m http.server, etc.).
// Abrir los HTML con file:// no cargará el header.
cargarHeader();

/* =========================================================
   1. Apertura/cierre de modales por hash en la URL
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

  // Si hay un modal abierto que ya no corresponde al hash actual
  // (ej. el usuario presionó "atrás"), lo cerramos.
  const modalAbierto = document.querySelector(".modal.show");
  if (modalAbierto && (!idModal || modalAbierto.id !== idModal)) {
    bootstrap.Modal.getOrCreateInstance(modalAbierto).hide();
    return;
  }

  if (!idModal) return;

  const elemento = document.getElementById(idModal);
  if (!elemento) return;

  bootstrap.Modal.getOrCreateInstance(elemento).show();
}

// Limpiar el hash cuando el usuario cierra el modal manualmente
// (X, backdrop o Escape). Si el hash ya cambió por "atrás", no tocamos la URL.
document.addEventListener("hidden.bs.modal", (event) => {
  const modalCerrado = event.target;
  if (modalesPorHash[window.location.hash] === modalCerrado.id) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
});

/* =========================================================
   2. Inicialización
   ========================================================= */

function inicializar() {
  // Si la página carga con un hash de modal, el navegador salta al
  // elemento (al final del documento). Lo regresamos al inicio.
  if (modalesPorHash[window.location.hash]) {
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "instant" })
    );
  }

  abrirModalDesdeHash();
  window.addEventListener("hashchange", abrirModalDesdeHash);
  window.addEventListener("popstate", abrirModalDesdeHash);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}