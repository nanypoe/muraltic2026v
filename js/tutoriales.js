const CONTENIDOS = {
  modulos: {
    titulo: "Módulos Transversales 2026",
    descripcion: "Selecciona una opción para ver la guía correspondiente.",
    esMenu: true,
    opciones: [
      {
        nombre: "¿Qué son y para qué sirven los módulos transversales?",
        icono: "❓",
        link: "tutorial.html?id=info-basica",
      },
      {
        nombre: "¿Cuándo inician y terminan los módulos transversales?",
        icono: "📅",
        link: "tutorial.html?id=calendario",
      },
      {
        nombre: "¿Dónde encuentro mi usuario y contraseña?",
        icono: "🔑",
        link: "tutorial.html?id=buscador-app",
      },
      {
        nombre: "¿Cómo accedo al CAMPUS Virtual?",
        icono: "🚪",
        link: "tutorial.html?id=acceso-cursos",
      },
      {
        nombre: "¿Cómo realizo los módulos transversales?",
        icono: "🎓",
        link: "tutorial.html?id=metodologia",
      },
    ],
  },
  "buscador-app": {
    titulo: "Busca tus credenciales para acceder al CAMPUS VIRTUAL",
    descripcion: "Sigue los pasos para encontrar tu nombre de usuario.",
    esBuscador: true,
  },
  calendario: {
    titulo:
      "Fechas de corte para completar los cuestionarios de los módulos transversales",
    descripcion:
      "Recordá que estas son las fechas límite para completar los foros y los cuestionarios de cada módulo. ¡No dejés que pase el tiempo!",
    youtubeId: "vBEn1K8u_E8", // Ejemplo
    cuerpo: `<p>Tabla de fechas aquí...</p>`,
  },
  "acceso-cursos": {
    titulo:
      "¿Cómo accedo al CAMPUS Virtual para hacer los Módulos Transversales?",
    esTutorial: true,
    youtubeId: "e2Lx_StxbcY",
    descripcion:
      "Para acceder al CAMPUS para poder iniciar con los Módulos Transversales mira el siguiente video:",
    cuerpo: `<p>En caso de que no tengas datos, podés seguir las instrucciones detalladas y con imágenes a continuación.</p>`,
    pasos: [
      "Primero, abrí el navegador de tu preferencia en tu dispositivo móvil. Pero te recomendamos usar Mozilla Firefox, porque abre directame los documentos PDF que estudiarás",
      "Ingresa en la barra de búsqueda o dale clic a la siguiente dirección: <a href='https://campus.inatec.edu.ni/' target='_blank'>https://campus.inatec.edu.ni/</a>",
      "Ubica el ícono del candado en la esquina superior derecha de la página y haz clic en él para acceder a la sección de inicio de sesión.",
      "Ingresá tu nombre de usuario y contraseña. Si no los conocés, podés encontrarlos en el <a href='https://nanypoe.github.io/muraltic2026v/tutorial.html?id=buscador-app' target=' target='_blank'>buscador de credenciales</a> seleccionando tu centro, año y carrera.",
      "Una vez que hayas completado tus datos, presioná el botón 'Acceder' para ingresar a la plataforma.",
      "Si es la primera vez que ingresás, el sistema podría pedirte que actualices tus datos personales, como tu edad y número de teléfono, en la sección de 'Editar perfil'.",
      "Para ver tus clases, hacé clic en el menú desplegable (las tres líneas) en la esquina superior derecha y seleccioná la opción 'Mis cursos'.",
      "Buscá el curso correspondiente a los Módulos Transversales 26 y hacé clic en él para acceder al contenido.",
      "Dentro del curso, verás las pestañas de Introducción y los diferentes Módulos. Seleccioná el módulo actual para comenzar a revisar el material y realizar las actividades programadas.",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const seccionId = params.get("seccion") || params.get("id");

  if (CONTENIDOS[seccionId]) {
    renderizarContenido(CONTENIDOS[seccionId]);
  }
});

function renderizarContenido(data) {
  document.getElementById("titulo-pagina").innerText = data.titulo;
  document.getElementById("descripcion-pagina").innerText = data.descripcion;

  const areaGuia = document.getElementById("cuerpo-guia");
  const areaBuscador = document.getElementById("area-buscador");
  const areaVideo = document.getElementById("area-video");

  // Limpiar áreas
  areaGuia.innerHTML = "";
  areaBuscador.style.display = "none";
  areaVideo.style.display = "none";

  if (data.esBuscador) {
    areaBuscador.style.display = "block";
    areaGuia.style.display = "none";
    areaBuscador.innerHTML = `
    <div id="pantalla-centro" class="pantalla-buscador">
        <p style="margin-bottom:1rem; font-weight:500;">¿En qué centro estudiás?</p>
        <div class="paso-card card-centro" onclick="seleccionarCentro('cheguevara')" style="margin-bottom:12px;">Somoto - CT Che Guevara</div>
        <div class="paso-card card-centro" onclick="seleccionarCentro('subsede')" style="margin-bottom:12px;">Palacagüina - Subsede</div>
        <div class="paso-card card-centro" onclick="seleccionarCentro('fabretto')" style="margin-bottom:12px;">Cusmapa - CT Fabretto</div>
    </div>
    <div id="pantalla-ingreso" class="pantalla-buscador" style="display:none;">
        <p style="margin-bottom:1rem; font-weight:500;">¿En qué año estás?</p>
        <div class="paso-card card-ingreso" onclick="seleccionarIngreso('nuevo')" style="margin-bottom:12px;">Soy de primer año | Nuevo Ingreso 2026</div>
        <div class="paso-card card-ingreso" onclick="seleccionarIngreso('continuidad')" style="margin-bottom:12px;">Soy de segundo/tercer año | Continuidad 2026</div>
    </div>
    <div id="pantalla-turno" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Seleccioná tu turno:</p><div id="opciones-turno"></div></div>
    <div id="pantalla-carrera" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Seleccioná tu carrera:</p><div id="opciones-carrera"></div></div>
    <div id="pantalla-lista" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Buscá tu nombre y dale click en <b>Ver</b>:</p><div id="lista-estudiantes" class="guia-texto" style="padding:0;"></div></div>
`;

    const script = document.createElement("script");
    script.src = "js/buscador.js";
    script.onload = () => iniciarBuscador();
    document.body.appendChild(script);
  } else if (data.esMenu) {
    let menuHTML = '<div class="card-grid" style="margin-top:1rem;">';
    data.opciones.forEach((opt) => {
      menuHTML += `
                <a href="${opt.link}" class="paso-card" style="padding: 1.2rem; flex-direction: row; gap: 15px; text-align: left;">
                    <span style="font-size: 1.5rem;">${opt.icono}</span>
                    <span style="font-weight: bold; font-size: 0.9rem;">${opt.nombre}</span>
                </a>`;
    });
    menuHTML += "</div>";
    areaGuia.innerHTML = menuHTML;
  } else if (data.esTutorial) {
    areaGuia.innerHTML = `<div class="video-container">
        <iframe id="player-youtube" src="https://www.youtube.com/embed/${data.youtubeId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="guia-texto">
        ${data.cuerpo}
        ${data.pasos ? "<h3>Pasos a seguir:</h3><ol>" + data.pasos.map((p) => `<li>${p}</li>`).join("") + "</ol>" : ""}
    </div>`;
  }
}

function cambiarVideoError(youtubeId, tipo) {
  const areaVideo = document.getElementById("area-video");
  const player = document.getElementById("player-youtube");

  player.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  areaVideo.style.display = "block";

  areaVideo.scrollIntoView({ behavior: "smooth" });
}
