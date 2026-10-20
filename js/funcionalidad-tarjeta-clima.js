// ==========================================
// 1. DOM
// ==========================================
const tolucaCurrent = document.getElementById("tolucaCurrent");
const tolucaFeels = document.getElementById("tolucaFeels");
const tolucaCondition = document.getElementById("tolucaCondition");
const tolucaUpdated = document.getElementById("toluca-updated");
const tolucaMax = document.getElementById("tolucaMax");

const visitorMax = document.getElementById("visitorMax");
const visitorInput = document.getElementById("visitorInput");
const visitorBtn = document.getElementById("visitorBtn");
const resultContainer = document.getElementById("result-container");
const visitorError = document.getElementById("visitor-error");

const visitorCity = document.getElementById("visitorCity");
const visitorAvailability = document.getElementById("visitorAvailability");
const visitorPhrase = document.getElementById("visitorPhrase");
const visitorCurrent = document.getElementById("visitorCurrent");
const visitorFeels = document.getElementById("visitorFeels");
const visitorCondition = document.getElementById("visitorCondition");

// ==========================================
// 2. UTILIDADES Y CONSTANTES
// ==========================================
const API_WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=19.29&longitude=-99.65&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max";

// Diccionario WMO (Open-Meteo)
const codigosClima = {
  0: "Despejado ☀️",
  1: "Mayormente despejado 🌤️",
  2: "Parcialmente nublado ⛅",
  3: "Nublado ☁️",
  45: "Niebla 🌫️",
  48: "Niebla con escarcha 🌫️❄️",
  51: "Llovizna ligera 🌦️",
  53: "Llovizna moderada 🌦️",
  55: "Llovizna densa 🌧️",
  56: "Llovizna helada ligera 🌧️❄️",
  57: "Llovizna helada densa 🌧️❄️",
  61: "Lluvia ligera 🌧️",
  63: "Lluvia moderada 🌧️",
  65: "Lluvia fuerte 🌧️",
  66: "Lluvia helada ligera 🌧️❄️",
  67: "Lluvia helada fuerte 🌧️❄️",
  71: "Nieve ligera 🌨️",
  73: "Nieve moderada 🌨️",
  75: "Nieve fuerte ❄️",
  77: "Granos de nieve ❄️",
  80: "Chubascos ligeros 🌦️",
  81: "Chubascos moderados 🌧️",
  82: "Chubascos violentos ⛈️",
  85: "Chubascos de nieve ligeros 🌨️",
  86: "Chubascos de nieve fuertes ❄️",
  95: "Tormenta ⛈️",
  96: "Tormenta con granizo ligero ⛈️",
  99: "Tormenta con granizo fuerte ⛈️"
};

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarErrorVisitante(mensaje) {
  if (visitorError) visitorError.textContent = mensaje;
}

function limpiarErrorVisitante() {
  if (visitorError) visitorError.textContent = "";
}

let tolucaMaxGlobal = 0;

// ==========================================
// 3. TOLUCA
// ==========================================
export async function obtenerClimaToluca() {
  if (!tolucaCurrent) return;

  try {
    const response = await fetch(API_WEATHER_URL);
    if (!response.ok) throw new Error("No se pudo completar la solicitud");

    const data = await response.json();
    tolucaMaxGlobal = data.daily.temperature_2m_max[0];

    tolucaCurrent.textContent = data.current.temperature_2m + "°C";
    tolucaMax.textContent = tolucaMaxGlobal + "°C";
    tolucaFeels.textContent = "Sensación térmica: " + data.current.apparent_temperature + "°C";

    const descripcion = codigosClima[data.current.weather_code] || "Clima desconocido";
    tolucaCondition.textContent = descripcion;

    const fecha = new Date();
    const horaFormateada = fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    tolucaUpdated.textContent = "Actualizado hoy a las " + horaFormateada;

  } catch (error) {
    console.error("Error al obtener el clima de Toluca:", error);
  }
}

obtenerClimaToluca();

// ==========================================
// 4. LÓGICA PARA EL VISITANTE
// ==========================================
export async function buscarClimaVisitante() {
  if (!visitorInput) return;

  limpiarErrorVisitante();
  const query = visitorInput.value.trim();

  if (!query) {
    mostrarErrorVisitante("Por favor, ingresa una ciudad.");
    return;
  }

  const aliasCiudades = {
    "cdmx": "Mexico City",
    "df": "Mexico City",
    "mexico df": "Mexico City",
    "mty": "Monterrey",
    "gdl": "Guadalajara",
    "qro": "Queretaro",
    "ira": "Irapuato"
  };

  const queryNormalizado = normalizarTexto(query);
  const queryParaApi = aliasCiudades[queryNormalizado] || query;

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(queryParaApi)}&count=1&language=es`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      mostrarErrorVisitante("No se encontró esa ciudad. Intenta con otro nombre.");
      return;
    }

    const { latitude, longitude, name, country, country_code, admin1 } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const current = weatherData.current;
    const maxVisitante = weatherData.daily.temperature_2m_max[0];

    const nombreCiudadNormalizado = normalizarTexto(name);
    const estadoNormalizado = admin1 ? normalizarTexto(admin1) : "";

    visitorCity.textContent = `${name}, ${country}`;
    visitorCurrent.textContent = `${current.temperature_2m}°C`;
    visitorMax.textContent = `${maxVisitante}°C`;
    visitorFeels.textContent = `Sensación térmica: ${current.apparent_temperature}°C`;

    const descripcion = codigosClima[current.weather_code] || "Clima desconocido";
    visitorCondition.textContent = descripcion;

    const estadosCercanos = ["mexico city", "ciudad de mexico", "mexico", "queretaro", "puebla"];
    const estadosExtremos = ["nuevo leon", "yucatan", "quintana roo", "baja california", "chihuahua", "guanajuato", "sonora", "sinaloa", "veracruz"];

    let esCercana = false;
    let esExtrema = false;
    const esInternacional = (country_code !== "MX");
    const esToluca = (country_code === "MX") && nombreCiudadNormalizado.includes("toluca");

    if (country_code === "MX") {
      esCercana = estadosCercanos.some(edo => estadoNormalizado.includes(edo) || nombreCiudadNormalizado.includes(edo));
      esExtrema = estadosExtremos.some(edo => estadoNormalizado.includes(edo) || nombreCiudadNormalizado.includes(edo));
    }

    let disponibilidad = "";
    let frase = "";

    if (esToluca) {
      disponibilidad = "¡Estás en mi ubicación actual! Disponible para presencial, híbrido o remoto.";
      frase = `¡Estás en mi ciudad! Si quieres, podemos tomarnos un café y hablar de código.`;

    } else if (nombreCiudadNormalizado.includes("irapuato")) {
      disponibilidad = "Disponible para remoto, por favor.";
      frase = `Viví aquí un tiempo, pero no extraño para nada el calor seco. Hoy la máxima ${maxVisitante}°C, necesitaría aire acondicionado. ¡Hablemos!`;

    } else if (nombreCiudadNormalizado.includes("ecatepec") || nombreCiudadNormalizado.includes("cuernavaca")) {
      disponibilidad = "Disponible para trabajo remoto. Estrictamente remoto.";
      frase = `Por pura salud mental, si hay un ex viviendo ahí, la modalidad presencial está cancelada. Pero si el proyecto es remoto, ¡hablemos!`;
    } else if (nombreCiudadNormalizado.includes("xicotepec")) {
      disponibilidad = "Disponible para modalidad presencial, híbrida o remoto.";
      frase = `¿Xicotepec de Juárez? Ahí da clases mi crush, así que esta ciudad tiene un pase directo. ¡Hablemos!`;

    } else if (nombreCiudadNormalizado.includes("puebla") || estadoNormalizado.includes("puebla")) {
      disponibilidad = "Disponible para modalidad presencial, híbrida o remoto.";
      frase = `¡El estado de mi museo favorito y mi crush! Aquí comienza la búsqueda. Si logras encontrar la ciudad exacta, te llevas el easter egg de verdad. (Pista: no es la capital).`;

    } else if (esCercana) {
      disponibilidad = "Disponible para modalidad presencial, híbrida o remota.";
      // Quité la validación extra de puebla aquí porque ya se atrapó arriba
      frase = `¡Estás en la zona ideal! ${name} está cerca, ¡colaboremos!`;

    } else if (esInternacional) {
      disponibilidad = "Disponible para trabajo remoto global o reubicación (sujeto a visado y oferta excepcional).";
      const paisesAmericanos = ["US", "CA", "BZ", "GT", "SV", "HN", "NI", "CR", "PA", "CU", "DO", "PR", "CO", "BR", "AR", "CL", "PE", "EC", "UY", "PY", "BO", "VE"];

      if (paisesAmericanos.includes(country_code)) {
        frase = `¡Estamos en el mismo continente! Hoy hace ${maxVisitante}°C en ${name}. Estoy abierta a trabajar remoto o reubicarme si el proyecto me apasiona.`;
      } else {
        frase = `¡Estás al otro lado del mundo! Hoy hace ${maxVisitante}°C en ${name}. Estoy abierta a trabajar remoto o tramitar un visado si el proyecto me apasiona. ¡Hablemos!`;
      }
    } else if (esExtrema || maxVisitante >= 32 || maxVisitante <= 5) {
      disponibilidad = "Clima extremo detectado en México. Disponible para remoto o reubicación con oferta excepcional.";

      if (maxVisitante >= 30) {
        frase = `Hoy hace mucho calor en ${name} (${maxVisitante}°C). Definitivamente necesitaría aire acondicionado.`;
      } else if (maxVisitante <= 10) {
        frase = `Hoy hace mucho frío en ${name} (${maxVisitante}°C). Necesitaría mi chamarra más abrigadora.`;
      } else {
        frase = `Aunque hoy esté agradable (${maxVisitante}°C), sé que el clima en ${name} suele ser extremo. ¡Pero me mudaría por una gran oferta!`;
      }
    } else {
      disponibilidad = "Clima agradable. Disponible para remoto o reubicación por una excelente oferta.";

      if (maxVisitante > tolucaMaxGlobal + 3) {
        frase = `Hace un poco más de calor en ${name} que en Toluca, pero el clima es agradable. ¡Hablemos!`;
      } else if (maxVisitante < tolucaMaxGlobal - 3) {
        frase = `${name} es más fresco que en Toluca. Ideal para café y codificar. ¡Hablemos!`;
      } else {
        frase = "¡El clima es muy similar al de Toluca! Hablemos";
      }
    }

    visitorAvailability.textContent = disponibilidad;
    visitorPhrase.textContent = frase;

    resultContainer.classList.remove("hidden");

    setTimeout(() => {
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

  } catch (error) {
    console.error("Error al buscar el clima del visitante:", error);
    mostrarErrorVisitante("Hubo un error de conexión. Intenta de nuevo.");
  }
}

// ==========================================
// 5. EVENTOS
// ==========================================
if (visitorBtn) {
  visitorBtn.addEventListener("click", buscarClimaVisitante);
}

if (visitorInput) {
  visitorInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buscarClimaVisitante();
    }
  });
}