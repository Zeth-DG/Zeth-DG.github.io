
```markdown
# Portafolio Personal | Lizeth Dorantes

¡Hola! Soy Zeth, desarrolladora Full Stack Jr. Este es mi portafolio personal, un proyecto que construí sin plantillas para mostrar mis habilidades técnicas,
mi transición de la biotecnología al desarrollo de software, y mi atención al detalle en la experiencia de usuario.

🌐 **[Visita el portafolio en vivo aquí](https://zeth-dg.github.io/)**

---

## Características principales

*   **Diseño e identidad visual:** Paleta de colores y diseño inspirados en una ilustración de Art Nouveau, implementados mediante variables CSS (Design Tokens) para mantener consistencia y evitar conflictos de cascada.
*   **Arquitectura modular (Vanilla JS):** Uso de módulos de JavaScript (ES6) para separar responsabilidades. El `header` se carga dinámicamente mediante `fetch()` para no duplicar código HTML entre las páginas.
*   **Widget del clima e interactividad:** Consumo de la API de **Open-Meteo** (clima y geocodificación). Incluye un motor de reglas lógico que evalúa la ubicación del visitante para mostrar mi disponibilidad laboral con mensajes personalizados y algunos *easter eggs* ocultos.
*   **Formulario accesible:** Implementación de validación personalizada desde cero. Se desactivó la validación nativa del navegador (`novalidate`) y se implementaron atributos `aria-invalid`, `aria-live` y manejo de foco para garantizar una experiencia accesible.
*   **Deep linking en modales:** Los modales de los proyectos se abren usando el hash de la URL (ej. `#modal-neme`), manejando correctamente el historial del navegador (eventos `popstate` y `hashchange`) para que el botón "Atrás" funcione sin romper la experiencia.

---

## Tecnologías utilizadas

*   **HTML5** (Semántico y accesible)
*   **CSS3** (CSS Grid, Flexbox, Custom Properties / Tokens)
*   **JavaScript** (Vanilla ES6+, Fetch API, Módulos, History API)
*   **Bootstrap 5** (Grid base y utilidades)
*   **Bootstrap Icons** y **Google Fonts** (Young Serif + Figtree)
*   **Open-Meteo API** (Clima y Geocodificación)

---

## Easter eggs (Detrás del código)

El buscador del clima no solo muestra la temperatura. Si exploras el código o pruebas buscando ciertas ciudades, encontrarás mensajes personalizados:
*   Ciudades donde viví (como Irapuato).
*   Ciudades donde viven mis exes (salud mental primero).
*   La ciudad de mi crush y la de mis abuelos (Catemaco, Xalapa, Ixtlahuaca).
*   Mi ciudad actual (Toluca) y lugares donde viví en el extranjero (Vancouver).

¡Anímate a probar el buscador con diferentes ciudades!

---

## Cómo ejecutar este proyecto localmente

Como el proyecto utiliza `fetch()` para cargar el header y consume una API externa, **no puedes abrir el archivo `index.html` directamente haciendo doble clic** (protocolo `file://`). Necesitas un servidor local.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Zeth-DG/Zeth-DG.github.io.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd Zeth-DG.github.io
   ```
3. Abre el proyecto con tu editor de código (ej. VS Code).
4. Inicia un servidor local:
   *   Si usas **VS Code**, instala la extensión **Live Server** y haz clic en "Go Live".
   *   O usa Python desde la terminal:
       ```bash
       python -m http.server 8000
       ```
5. Abre `http://localhost:8000` en tu navegador.

---

## 📬 Contacto

Si tienes alguna pregunta, propuesta o simplemente quieres charlar sobre código, datos o diseño, puedes encontrarme en:

*   **LinkedIn:** [Lizeth Dorantes](https://www.linkedin.com/in/lizeth-dorantes/)
*   **GitHub:** [@Zeth-DG](https://github.com/Zeth-DG)
*   **Email:** lzethdg@gmail.com
```
   git push origin develop
   ```
