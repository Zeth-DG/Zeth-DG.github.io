import { validarCorreo, validarNombre, validarMensaje } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const iptNombre = document.getElementById("nombre");
    const errorNombre = document.getElementById("errorNombre");

    const iptEmail = document.getElementById("email");
    const errorEmail = document.getElementById("errorEmail");

    const iptMensaje = document.getElementById("mensaje");
    const errorMensaje = document.getElementById("errorMensaje");

    const btn = document.getElementById("submit-btn");
    const status = document.getElementById("form-status");

    function mostrarError(elemento, resultado, input) {
        if (resultado.valido) {
            elemento.textContent = "";
            input.setAttribute("aria-invalid", "false");
        } else {
            elemento.textContent = resultado.mensaje;
            input.setAttribute("aria-invalid", "true");
        }
    }

    function limpiarStatus() {
        if (status.classList.contains("success") || status.classList.contains("error")) {
            status.textContent = "";
            status.className = "";
            status.style.color = "";
        }
    }

    function configurarValidacionCampo(input, elementoError, funcionValidacion) {
        const validar = () => {
            limpiarStatus();
            const resultado = funcionValidacion(input.value);
            mostrarError(elementoError, resultado, input);
        };
        input.addEventListener("input", validar);
        input.addEventListener("blur", validar);
    }

    // ¡AQUÍ ESTABA EL ERROR DE TIPEO! Ya está corregido.
    configurarValidacionCampo(iptNombre, errorNombre, validarNombre);
    configurarValidacionCampo(iptEmail, errorEmail, validarCorreo);
    configurarValidacionCampo(iptMensaje, errorMensaje, validarMensaje);

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const resultadoNombre = validarNombre(iptNombre.value);
        const resultadoEmail = validarCorreo(iptEmail.value);
        const resultadoMensaje = validarMensaje(iptMensaje.value);

        mostrarError(errorNombre, resultadoNombre, iptNombre);
        mostrarError(errorEmail, resultadoEmail, iptEmail);
        mostrarError(errorMensaje, resultadoMensaje, iptMensaje);

        if (!(resultadoNombre.valido && resultadoEmail.valido && resultadoMensaje.valido)) {
            // Enfocar el primer campo inválido
            const primerInvalido = [
                !resultadoNombre.valido && iptNombre,
                !resultadoEmail.valido && iptEmail,
                !resultadoMensaje.valido && iptMensaje
            ].find(Boolean);
            primerInvalido?.focus();
            return;
        }

        const textoOriginal = btn.textContent;
        btn.textContent = "Enviando...";
        btn.disabled = true;
        status.textContent = "";
        status.className = "";

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                form.reset();
                errorNombre.textContent = "";
                errorEmail.textContent = "";
                errorMensaje.textContent = "";
                iptNombre.setAttribute("aria-invalid", "false");
                iptEmail.setAttribute("aria-invalid", "false");
                iptMensaje.setAttribute("aria-invalid", "false");

                status.textContent = "¡Mensaje enviado! Te responderé muy pronto.";
                status.className = "success";

                setTimeout(() => {
                    if (status.classList.contains("success")) {
                        status.textContent = "";
                        status.className = "";
                    }
                }, 8000);
            } else {
                status.textContent = "Hubo un problema al enviar el mensaje. Intenta de nuevo.";
                status.className = "error";
            }
        } catch (error) {
            console.error("Error:", error);
            status.textContent = "Error de conexión. Revisa tu internet.";
            status.className = "error";
        } finally {
            btn.textContent = textoOriginal;
            btn.disabled = false;
        }
    });
});