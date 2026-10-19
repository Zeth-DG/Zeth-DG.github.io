export function validarCorreo(email) {
    if (typeof email !== "string") {
        return { valido: false, mensaje: "Introduce texto" };
    }

    const emailLimpio = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailLimpio === "") {
        return { valido: false, mensaje: "Escribe tu correo electrónico." };
    }

    if (emailLimpio.length > 254) {
        return {
            valido: false,
            mensaje: "El correo es demasiado largo (máximo 254 caracteres)."
        };
    }

    if (!emailRegex.test(emailLimpio)) {
        return {
            valido: false,
            mensaje: "Escribe un correo con el formato nombre@dominio.com, sin espacios."
        };
    }

    return { valido: true, mensaje: "Correo electrónico válido" };
}

export function validarMensaje(mensaje) {
    if (typeof mensaje !== "string") {
        return { valido: false, mensaje: "El mensaje debe ser texto." };
    }

    const mensajeLimpio = mensaje.trim();

    if (mensajeLimpio === "") {
        return { valido: false, mensaje: "Escribe tu mensaje." };
    }

    if (mensajeLimpio.length < 10) {
        return {
            valido: false,
            mensaje: `Tu mensaje debe tener al menos 10 caracteres (llevas ${mensajeLimpio.length})`
        };
    }

    if (mensajeLimpio.length > 1000) {
        return {
            valido: false,
            mensaje: `Tu mensaje no puede pasar de 1000 caracteres (llevas ${mensajeLimpio.length})`
        };
    }

    return { valido: true, mensaje: "El mensaje es válido" };
}

export function validarNombre(nombre) {
    if (typeof nombre !== "string") {
        return { valido: false, mensaje: "Introduce texto" };
    }

    const nombreLimpio = nombre.trim();

    if (nombreLimpio === "") {
        return { valido: false, mensaje: "Escribe tu nombre." };
    }

    if (nombreLimpio.length < 3 || nombreLimpio.length > 100) {
        return {
            valido: false,
            mensaje: "Tu nombre debe tener entre 3 y 100 caracteres."
        };
    }

    const nameRegex = /^[\p{L}\s\.-]+$/u;

    if (!nameRegex.test(nombreLimpio)) {
        return {
            valido: false,
            mensaje: "Usa solo letras, espacios, puntos o guiones. No uses números ni símbolos."
        };
    }

    return { valido: true, mensaje: "Nombre válido." };
}