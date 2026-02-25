const CONTENIDOS = {
  modulos: {
    titulo: "Módulos Transversales 2026",
    descripcion: "Selecciona una opción para ver la guía correspondiente.",
    esMenu: true,
    opciones: [
      {
        nombre: "¿Qué son y para qué sirven?",
        icono: "❓",
        link: "tutorial.html?id=info-basica",
      },
      {
        nombre: "Calendario y Fechas Clave",
        icono: "📅",
        link: "tutorial.html?id=calendario",
      },
      {
        nombre: "Buscador de Credenciales",
        icono: "🔑",
        link: "tutorial.html?id=buscador-app",
      },
      {
        nombre: "¿Cómo realizo mis tareas?",
        icono: "🎓",
        link: "tutorial.html?id=metodologia",
      },
      {
        nombre: "Tengo un problema/error",
        icono: "⚠️",
        link: "tutorial.html?id=errores",
      },
    ],
  },
  "buscador-app": {
    titulo: "Busca tus Credenciales",
    descripcion: "Sigue los pasos para encontrar tu nombre de usuario.",
    esBuscador: true,
  },
  calendario: {
    titulo: "Calendario y Fechas Clave",
    descripcion: "Fechas de corte para entrega de evidencias.",
    youtubeId: "vBEn1K8u_E8", // Ejemplo
    cuerpo: `<p>Tabla de fechas aquí...</p>`,
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
  areaGuia.innerHTML = "";

  if (data.esBuscador) {
    areaBuscador.style.display = "block";
    areaGuia.style.display = "none";
    // Inyectamos la estructura del buscador
    areaBuscador.innerHTML = `
    <div id="pantalla-centro" class="pantalla-buscador">
        <p style="margin-bottom:1rem; font-weight:500;">¿En qué centro estudias?</p>
        <div class="paso-card card-centro" onclick="seleccionarCentro('cheguevara')" style="margin-bottom:12px;">Somoto - CT Che Guevara</div>
        <div class="paso-card card-centro" onclick="seleccionarCentro('subsede')" style="margin-bottom:12px;">Palacagüina - Subsede</div>
        <div class="paso-card card-centro" onclick="seleccionarCentro('fabretto')" style="margin-bottom:12px;">Cusmapa - CT Fabretto</div>
    </div>
    <div id="pantalla-ingreso" class="pantalla-buscador" style="display:none;">
        <p style="margin-bottom:1rem; font-weight:500;">¿Cuál es tu tipo de ingreso?</p>
        <div class="paso-card card-ingreso" onclick="seleccionarIngreso('nuevo')" style="margin-bottom:12px;">Nuevo Ingreso 2026</div>
        <div class="paso-card card-ingreso" onclick="seleccionarIngreso('continuidad')" style="margin-bottom:12px;">Continuidad</div>
    </div>
    <div id="pantalla-turno" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Selecciona tu turno:</p><div id="opciones-turno"></div></div>
    <div id="pantalla-carrera" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Selecciona tu carrera:</p><div id="opciones-carrera"></div></div>
    <div id="pantalla-lista" class="pantalla-buscador" style="display:none;"><p style="margin-bottom:1rem;">Busca tu nombre:</p><div id="lista-estudiantes" class="guia-texto" style="padding:0;"></div></div>
`;
    // Cargamos el script del buscador dinámicamente
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
  }
}
