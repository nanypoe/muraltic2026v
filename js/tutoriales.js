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
        nombre: "¿Cómo realizo los módulos transversales?",
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
  errores: {
    titulo: "Errores que podrían aparecer y cómo solucionarlos",
    descripcion:
      "Si te encuentras con algún problema al acceder o completar los módulos, revisa esta sección para encontrar la solución. Haz clic en el error que estás experimentando para ver los pasos detallados para resolverlo.",
    esMenu: true,
    opciones: [
      {
        nombre: "Acceso inválido. Por favor intentelo otra vez.",
        descripcion:
          "Este error suele aparecer cuando el usuario o la contraseña son incorrectos.",
        icono: "🚫",
        link: "tutorial.html?id=error-login",
      },
      {
        nombre: "Editar perfil",
        descripcion:
          "Aparece un mensaje que dice Editar perfil y no me deja avanzar.",
        icono: "📝",
        link: "tutorial.html?id=error-perfil",
      },
    ],
  },
  "error-login": {
    titulo: "Acceso inválido. Por favor intentelo otra vez.",
    descripcion:
      "Este es un error común que suele ocurrir por varias razones. A continuación, te explicamos las causas más frecuentes y cómo solucionarlo según el dispositivo que estés usando.",
    esErrorDetalle: true,
    videoCel: "Ef3-iOLA1KY", // Ejemplo
    videoPC: "Ef3-iOLA1KY", // Ejemplo
    pasos: [
      "1. En el cuadro de texto que dice 'Nombre de usuario', asegurate de escribir tu usuario en <b>minúsculas</b> y con un <b>punto</b> entre tu nombre y apellido (ejemplo: juan.perez). O escríbelo exactamente como aparece en el buscador de credenciales y en listado de credenciales que envió tu docente a los grupos de WhatsApp y Telegram.",
      "2. En el cuadro de texto que dice 'Contraseña', recordá que la contraseña por defecto es <b>Inatec26*</b>. Es importante que la primera letra sea mayúscula (I mayúscula) y que al final lleve un asterisco (*).",
      "3. Asegurate de no dejar espacios al final del texto en ambos cuadros (usuario y contraseña), ya que esto puede causar el error de acceso. Si estás copiando y pegando la información, es recomendable escribirla manualmente para evitar espacios adicionales.",
    ],
  },
  "error-perfil": {
    titulo: "Editar perfil",
    descripcion:
      "Aparece un mensaje que dice Editar perfil y no me deja avanzar. Este error suele ocurrir cuando el sistema detecta que tu perfil no está completo. Para solucionarlo, sigue estos pasos:",
    esErrorDetalle: true,
    videoCel: "Ef3-iOLA1KY", // Ejemplo
    videoPC: "Ef3-iOLA1KY", // Ejemplo
    pasos: [
      "<img src='assets/img/error-perfil-paso1.png' class='img-tutorial' alt='Ejemplo usuario'>",
      "1. Si te fijas aparece una casilla que dice 'Nombre' con un signo de exclamación rojo a la par ❗. Pero ahí tu nombre ya aparece completo, ¿verdad? Entonces, lo que debes hacer es lo siguiente.",      
      "2. Desliza la pantalla hacia abajo (si estás en el celular) o baja con el scroll (si estás en la computadora) hasta que encuentres los campos que dicen 'Edad', 'Teléfono' y 'Sexo'.",
      "3. Completa esos campos con tu información personal. Es importante que llenes esos campos para que el sistema te permita avanzar.",
      "4. Una vez que hayas llenado esos campos, desliza o baja hasta el final de la página y busca un botón rojo que dice 'Actualizar información de perfil'. Haz clic en ese botón para guardar los cambios.",
      "5. Después de actualizar tu perfil, vuelve a intentar acceder a mis cursos tocando el botón de menú (el botón de las 3 rayitas que está en la parte superior derecha) y deberías poder ingresar sin problemas. Si el error persiste, asegúrate de haber completado todos los campos correctamente y de haber guardado los cambios.",
      "6. Si después de seguir estos pasos el problema continúa, te recomendamos contactar a tu Docente TIC.",
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
  } else if (data.esErrorDetalle) {
    // Lógica de Diccionario de Errores con Selector de Dispositivo
    areaGuia.innerHTML = `
            <div class="dispositivo-selector" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:1.5rem;">
                <button class="btn-primary" onclick="cambiarVideoError('${data.videoCel}', 'pasos-cel')">📱 Móvil</button>
                <button class="btn-primary" style="background:var(--inatec-cyan)" onclick="cambiarVideoError('${data.videoPC}', 'pasos-pc')">💻 Computadora</button>
            </div>
            <div id="instrucciones-error">
                <p><i>Presiona en <b>Móvil</b> para ver el tutorial en video de cómo solucionar este error si estás accediendo desde tu celular. O presiona en <b>Computadora</b> si estás accediendo desde una computadora. Si no tienes suficientes datos o no te carga, podés seguir los pasos acontinuación:</i></p>
                <ul style="list-style:none; text-align:left; margin-top:1rem; padding:0;">
    ${data.pasos
      .map((p) => {
        // Si el paso empieza con "<img", lo imprimimos sin el estilo de lista
        if (p.startsWith("<img")) {
          return `<div style="width:100%">${p}</div>`;
        }
        // Si es texto normal, lo ponemos con su bullet y margen
        return `<li style="margin-bottom:15px; padding-left:25px; position:relative;">
                    <span style="position:absolute; left:0; color:var(--inatec-blue)">•</span>
                    ${p}
                </li>`;
      })
      .join("")}
</ul>
            </div>
        `;
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

// Función para cambiar el video dinámicamente
function cambiarVideoError(youtubeId, tipo) {
  const areaVideo = document.getElementById("area-video");
  const player = document.getElementById("player-youtube");

  player.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  areaVideo.style.display = "block";

  // Scroll suave hasta el video
  areaVideo.scrollIntoView({ behavior: "smooth" });
}
