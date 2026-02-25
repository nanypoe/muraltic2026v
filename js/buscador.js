let dbEstudiantes = [];
let filtros = { centro: '', ingreso: '', turno: '', carrera: '' };
let historialPantallas = []; // Para el botón "Atrás"

async function iniciarBuscador() {
    try {
        const response = await fetch('assets/data/estudiantes.json');
        dbEstudiantes = await response.json();
        cambiarPantalla('pantalla-centro');
    } catch (error) {
        console.error("Error:", error);
    }
}

function cambiarPantalla(id, esRetroceso = false) {
    if (!esRetroceso) historialPantallas.push(id);
    
    document.querySelectorAll('.pantalla-buscador').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    // Cambiar el texto del botón de regresar
    const btnRegresar = document.getElementById('link-volver');
    if (historialPantallas.length > 1) {
        btnRegresar.innerText = "← Paso anterior";
        btnRegresar.onclick = (e) => {
            e.preventDefault();
            volverAtras();
        };
    } else {
        btnRegresar.innerText = "← Volver al inicio";
        btnRegresar.onclick = null; 
        btnRegresar.href = "index.html";
    }
}

function volverAtras() {
    historialPantallas.pop(); // Quitar la actual
    const anterior = historialPantallas[historialPantallas.length - 1];
    cambiarPantalla(anterior, true);
}

function seleccionarCentro(val) {
    filtros.centro = val;
    cambiarPantalla('pantalla-ingreso');
}

function seleccionarIngreso(val) {
    filtros.ingreso = val;
    renderizarTurnos();
    cambiarPantalla('pantalla-turno');
}

function renderizarTurnos() {
    const turnos = [...new Set(dbEstudiantes
        .filter(i => i.centro === filtros.centro && i.ingreso === filtros.ingreso)
        .map(i => i.turno))];
    
    const container = document.getElementById('opciones-turno');
    container.innerHTML = turnos.map(t => `
        <div class="paso-card card-turno" onclick="seleccionarTurno('${t}')" style="margin-bottom:12px; flex-direction:row; padding:1.2rem; justify-content: space-between;">
            <span style="font-weight:bold;">${t.toUpperCase()}</span>
            <span>➔</span>
        </div>
    `).join('');
}

function seleccionarTurno(val) {
    filtros.turno = val;
    renderizarCarreras();
    cambiarPantalla('pantalla-carrera');
}

function renderizarCarreras() {
    const grupos = dbEstudiantes.filter(i => 
        i.centro === filtros.centro && i.ingreso === filtros.ingreso && i.turno === filtros.turno
    );
    const unicoGrupos = [...new Map(grupos.map(item => [`${item.carrera}-${item.grupo}`, item])).values()];

    const container = document.getElementById('opciones-carrera');
    container.innerHTML = unicoGrupos.map(g => `
        <div class="paso-card card-carrera" onclick="mostrarEstudiantes('${g.carrera}', '${g.grupo}')" style="margin-bottom:12px; align-items:flex-start; text-align:left;">
            <span style="font-weight:bold; color:var(--inatec-blue); font-size:1rem;">${g.carrera.toUpperCase()}</span>
            <small style="color:var(--inatec-magenta)">Grupo: ${g.grupo}</small>
        </div>
    `).join('');
}

function mostrarEstudiantes(carrera, grupo) {
    const lista = dbEstudiantes.filter(i => 
        i.centro === filtros.centro && i.turno === filtros.turno && 
        i.carrera === carrera && i.grupo === grupo
    ).sort((a,b) => a.nombre.localeCompare(b.nombre));

    const container = document.getElementById('lista-estudiantes');
    container.innerHTML = lista.map(s => `
        <div onclick="abrirModal('${s.nombre}', '${s.usuario}')" style="padding:15px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.9rem;">${s.nombre}</span>
            <span style="color:var(--inatec-cyan); font-weight:bold;">VER</span>
        </div>
    `).join('');
    cambiarPantalla('pantalla-lista');
}

function abrirModal(nombre, usuario) {
    const modalHTML = `
        <div class="modal-overlay" id="modal-credencial">
            <div class="modal-content">
                <h3 style="color:var(--inatec-blue)">Tus Credenciales</h3>
                <p style="margin-top:10px; font-size:0.9rem;">${nombre}</p>
                <div class="modal-user-box">${usuario}</div>
                <p style="font-size:0.8rem; color:var(--text-muted)">Usa este usuario para acceder a la plataforma.</p>
                <button class="btn-primary" style="margin-top:1.5rem;" onclick="document.getElementById('modal-credencial').remove()">ENTENDIDO</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}