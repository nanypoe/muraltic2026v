/**
 * Core.js - Gestión de componentes dinámicos
 * Mural TIC 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    insertarHeader();
    insertarFooter();
    insertarBotonFeedback();
});

function insertarHeader() {
    const header = `
    <header class="hero">
        <div class="container">
            <img src="assets/img/logo-inatec.jpg" alt="Logo INATEC" onerror="this.src='https://via.placeholder.com/80?text=INATEC'">
            <h1>Mural TIC Virtual</h1>
            <p>Centro Tecnológico Che Guevara - Somoto</p>
        </div>
    </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', header);
}

function insertarFooter() {
    const footer = `
    <footer style="background: #1e293b; color: #94a3b8; padding: 2rem 0; text-align: center; margin-top: 3rem;">
        <div class="container">
            <p style="font-weight: bold; color: white; margin-bottom: 5px;">INATEC Somoto</p>
            <p style="font-size: 0.85rem;">Tecnológico Nacional</p>
            <div style="width: 40px; height: 2px; background: #8cc63f; margin: 10px auto;"></div>
            <small>&copy; 2026 - Área de Docencia TIC</small>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footer);
}

function insertarBotonFeedback() {
    // 1. Verificar si estamos en la landing (index.html)
    // Si la URL no contiene "tutorial.html", asumimos que es la landing y no ponemos el botón
    if (!window.location.pathname.includes('tutorial.html')) {
        return; 
    }

    const googleFormUrl = "https://forms.gle/XmdfqW3BasDgXHXQ8";
    
    const feedbackHTML = `
    <div class="feedback-wrapper" id="container-feedback">
        <div class="feedback-badge" id="mensaje-feedback">
            ¿Te sirvió de ayuda? <br> Danos tu opinión aquí.
        </div>
        <a href="${googleFormUrl}" target="_blank" class="btn-feedback" title="Danos tu opinión">
            💬
        </a>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', feedbackHTML);

    // 2. Lógica para desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
        const mensaje = document.getElementById('mensaje-feedback');
        if (mensaje) {
            mensaje.style.transition = "opacity 1s ease";
            mensaje.style.opacity = "0";
            // Eliminar del DOM después de la transición
            setTimeout(() => mensaje.remove(), 1000);
        }
    }, 3000);
}