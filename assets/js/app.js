const App = {
  cache: {},

  async fetchJSON(filename) {
    // Soporta buscar en la raíz o en assets/data/ por compatibilidad
    const possiblePaths = [
      filename,
      `assets/data/${filename}`,
      `./${filename}`,
    ];
    for (const path of possiblePaths) {
      if (this.cache[path]) return this.cache[path];
      try {
        const res = await fetch(path);
        if (res.ok) {
          const data = await res.json();
          this.cache[path] = data;
          return data;
        }
      } catch (e) {
        // Sigue intentando en la siguiente ruta
      }
    }
    console.warn(`No se pudo cargar el archivo: ${filename}`);
    return null;
  },

  // Helper: Ajusta rutas de imágenes para GitHub Pages (elimina la barra inicial absoluta)
  fixImgPath(path) {
    if (!path || typeof path !== "string" || path.trim() === "") return null;
    let clean = path.trim();
    if (clean.startsWith("/")) {
      clean = clean.substring(1);
    }
    return clean;
  },

  // Helper: Detecta URLs dentro de textos y las convierte en hipervínculos cliqueables
  formatTextWithLinks(text) {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-link-auto">${url}</a>`;
    });
  },

  // Helper: Extrae el ID de video de YouTube o retorna la URL embebible
  getYouTubeEmbedURL(url) {
    if (!url || typeof url !== "string" || url.trim() === "") return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  },

  // Componente reutilizable para videos de YouTube o tarjetas de fallback
  renderVideoContainer(url, title = "Video Explicativo") {
    const embedUrl = this.getYouTubeEmbedURL(url);
    if (embedUrl) {
      return `
                <div class="my-6 bg-slate-900 p-3 rounded-3xl border-4 border-slate-900 shadow-xl">
                    <div class="video-responsive-wrapper">
                        <iframe src="${embedUrl}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            `;
    } else {
      return `
                <div class="my-6 p-6 rounded-3xl bg-amber-50 border-3 border-amber-300 text-amber-900 flex items-center gap-4 shadow-sm">
                    <div class="w-12 h-12 rounded-2xl bg-amber-200 text-amber-700 flex items-center justify-center text-2xl flex-shrink-0 font-black">
                        🎬
                    </div>
                    <div>
                        <h4 class="font-extrabold text-base">${title}</h4>
                        <p class="text-xs font-semibold text-amber-800 mt-0.5">El contenido en video para este apartado estará disponible próximamente en el canal oficial.</p>
                    </div>
                </div>
            `;
    }
  },

  // Configuración de inicialización y enrutado
  init() {
    window.addEventListener("hashchange", () => this.route());
    window.addEventListener("DOMContentLoaded", () => {
      this.setupMobileMenu();
      this.route();
    });
  },

  // Control del menú hamburguesa desplegable en móviles
  setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    // Ocultar menú móvil al hacer clic en un enlace
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
      });
    });
  },

  // Helper: Formatear fechas de "AAAA-MM-DD" a "22 de agosto de 2026"
  // Helper: Formatear fechas de "AAAA-MM-DD" a "jueves 22 de agosto de 2026"
  formatDate(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return dateStr;

    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return dateStr;

    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const weekdays = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    return `${weekdays[date.getDay()]} ${day} de ${months[month]} de ${year}`;
  },

  // Manejador de rutas SPA
  async route() {
    const app = document.getElementById("app");
    const hash = window.location.hash || "#/";

    // Indicador de carga
    app.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 animate-pop">
            <div class="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-slate-600 font-extrabold text-sm tracking-wide">Cargando contenido del Mural TIC...</p>
        </div>
    `;

    if (hash === "#/" || hash === "" || hash === "#/inicio") {
      await this.renderHome();
    } else if (hash === "#/para-que") {
      await this.renderParaQue();
    } else if (hash === "#/modulos") {
      await this.renderModulos();
    } else if (hash.startsWith("#/modulo/")) {
      const moduloId = hash.replace("#/modulo/", "");
      await this.renderDetalleModulo(moduloId);
    } else if (hash === "#/calendario") {
      await this.renderCalendario();
    } else if (hash === "#/guias" || hash === "#/como-ingresar") {
      // Vista principal de guías (índice)
      await this.renderGuiasIndex();
    } else if (hash === "#/guias/como-realizar-modulos") {
      await this.renderComoRealizarModulos();
    } else if (hash === "#/guias/acceso-campus") {
      await this.renderGuiaAcceso();
    } else if (hash === "#/guias/foros") {
      await this.renderGuiaForos();
    } else if (hash === "#/guias/cuestionarios") {
      await this.renderGuiaCuestionarios();
    } else if (hash === "#/credenciales") {
      await this.renderCredenciales();
    } else {
      await this.renderHome();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // 1. LANDING PAGE PRINCIPAL (generalidades.json)
  async renderHome() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("generalidades.json");

    if (!data || !data.generalidades) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar generalidades.json</div>`;
      return;
    }

    const gen = data.generalidades;

    app.innerHTML = `
            <div class="animate-pop space-y-12">
                <section class="bg-gradient-to-b from-indigo-900 via-indigo-800 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b-8 border-yellow-400">
                    <div class="max-w-5xl mx-auto text-center space-y-6">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-yellow-400 text-indigo-950 font-black text-xs uppercase tracking-widest shadow-md">
                            ${gen.badge || "MURAL TIC VIRTUAL"}
                        </span>
                        <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                            ${gen.titulo}
                        </h1>
                        <p class="text-xl sm:text-2xl font-bold text-indigo-200 max-w-3xl mx-auto">
                            ${gen.subtitulo}
                        </p>
                        <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            ${this.formatTextWithLinks(gen.descripcion_larga || gen.descripcion_corta)}
                        </p>

                        <div class="pt-6 flex flex-wrap justify-center gap-4">
                            <a href="#/modulos" class="btn-3d px-8 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-indigo-950 font-black text-base shadow-[0_6px_0_#ca8a04] flex items-center gap-2">
                                <span>🚀 Explorar Módulos</span>
                            </a>
                            <a href="#/para-que" class="btn-3d px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base border-2 border-white/20 flex items-center gap-2">
                                <span>💡 ¿Para qué me sirven?</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl font-black text-slate-900">Competencias Clave que Desarrollarás</h2>
                        <p class="text-slate-600 font-bold mt-2">Habilidades estratégicas indispensables para tu éxito profesional</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${(gen.beneficios_clave || [])
                          .filter(
                            (b) =>
                              b.titulo !==
                              "Quiero saber más sobre ¿para qué me sirven los módulos transversales?",
                          )
                          .map(
                            (b) => `
                            <div class="bg-white p-6 rounded-3xl border-4 border-slate-200 card-playful flex flex-col justify-between">
                                <div>
                                    <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                                        <span class="material-symbols-outlined text-3xl">${b.icono || "star"}</span>
                                    </div>
                                    <h3 class="text-xl font-black text-slate-900 mb-2">${b.titulo}</h3>
                                    <p class="text-sm text-slate-600 font-medium leading-relaxed">${this.formatTextWithLinks(b.descripcion)}</p>
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </section>

                <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div class="bg-rose-50 border-4 border-rose-200 p-8 rounded-3xl shadow-sm">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-3xl">⚠️</span>
                                <h3 class="text-2xl font-black text-rose-950">${gen.caracter_obligatorio?.titulo || "¿Qué pasa si no los completo?"}</h3>
                            </div>
                            <p class="text-sm font-semibold text-rose-900 leading-relaxed">
                                ${this.formatTextWithLinks(gen.caracter_obligatorio?.respuesta_corta || gen.caracter_obligatorio?.texto)}
                            </p>
                        </div>

                        <div class="bg-emerald-50 border-4 border-emerald-200 p-8 rounded-3xl shadow-sm">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-3xl">✅</span>
                                <h3 class="text-2xl font-black text-emerald-950">${gen.aprobacion?.titulo || "¿Cómo se aprueban?"}</h3>
                            </div>
                            <p class="text-sm font-semibold text-emerald-900 leading-relaxed">
                                ${this.formatTextWithLinks(gen.aprobacion?.texto)}
                            </p>
                        </div>

                    </div>
                </section>
            </div>
        `;
  },

  // 2. SECCIÓN ¿PARA QUÉ SIRVEN? (para_que_sirven.json)
  async renderParaQue() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("para_que_sirven.json");

    if (!data || !data.para_que || !data.para_que[0]) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar para_que_sirven.json</div>`;
      return;
    }

    const pq = data.para_que[0];

    app.innerHTML = `
            <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                <div class="bg-amber-400 p-8 sm:p-12 rounded-3xl border-4 border-slate-900 shadow-[0_10px_0_#0f172a] text-slate-900">
                    <h1 class="text-3xl sm:text-5xl font-black mb-4">${pq.titulo}</h1>
                    <p class="text-base sm:text-lg font-bold text-slate-900 max-w-3xl leading-relaxed">
                        ${this.formatTextWithLinks(pq.descripcion)}
                    </p>
                </div>

                <div>
                    <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                        <span>🎯</span> Propósitos Fundamentales
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${(pq.propositos || [])
                          .map(
                            (p) => `
                            <div class="bg-white p-6 rounded-3xl border-4 border-slate-200 card-playful">
                                <h3 class="text-xl font-black text-indigo-600 mb-2">${p.titulo}</h3>
                                <p class="text-sm font-medium text-slate-600">${this.formatTextWithLinks(p.descripcion)}</p>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>

                <div>
                    <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                        <span>🚀</span> Competencias Transversales
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${(pq.competencias || [])
                          .map(
                            (c) => `
                            <div class="bg-white p-6 rounded-3xl border-4 border-slate-200 card-playful">
                                <h3 class="text-lg font-black text-slate-900 mb-2">${c.nombre}</h3>
                                <p class="text-xs font-semibold text-slate-600 leading-relaxed">${this.formatTextWithLinks(c.descripcion)}</p>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;
  },

  // 3. CATÁLOGO DE MÓDULOS (modulos_actividades.json)
  async renderModulos() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("modulos_actividades.json");

    if (!data || !data.modulos_transversales) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar modulos_actividades.json</div>`;
      return;
    }

    const modulos = data.modulos_transversales;

    app.innerHTML = `
            <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div class="text-center max-w-3xl mx-auto space-y-3">
                    <span class="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase">Plan de Estudio 2026</span>
                    <h1 class="text-3xl sm:text-5xl font-black text-slate-900">Módulos Transversales</h1>
                    <p class="text-slate-600 font-bold text-base">Selecciona un módulo para explorar sus unidades y actividades requeridas.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    ${modulos
                      .map((m, index) => {
                        const slug = this.slugify(m.nombre);
                        return `
                            <div class="bg-white rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] p-8 flex flex-col justify-between card-playful">
                                <div>
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                                            <span class="material-symbols-outlined text-3xl">${m.icono || "menu_book"}</span>
                                        </div>
                                        <span class="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs">
                                            ${m.unidades_a_completar || m.detalle_unidades?.length || 0} Unidades
                                        </span>
                                    </div>
                                    <h3 class="text-2xl font-black text-slate-900 mb-3">${m.nombre}</h3>
                                    <p class="text-sm font-medium text-slate-600 leading-relaxed mb-6">${this.formatTextWithLinks(m.descripcion)}</p>
                                </div>
                                <a href="#/modulo/${slug}" class="btn-3d w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-center text-sm shadow-[0_4px_0_#3730a3] block">
                                    Ver Unidades y Actividades →
                                </a>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            </div>
        `;
  },

  // DETALLE DE UN MÓDULO ESPECÍFICO
  async renderDetalleModulo(slug) {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("modulos_actividades.json");

    if (!data || !data.modulos_transversales) return;

    const modulo = data.modulos_transversales.find(
      (m) => this.slugify(m.nombre) === slug,
    );

    if (!modulo) {
      app.innerHTML = `
                <div class="p-12 text-center">
                    <h2 class="text-2xl font-black text-slate-900 mb-4">Módulo no encontrado</h2>
                    <a href="#/modulos" class="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">Volver al catálogo</a>
                </div>
            `;
      return;
    }

    app.innerHTML = `
            <div class="animate-pop max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                <a href="#/modulos" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm">
                    ← Volver a Módulos
                </a>

                <div class="bg-indigo-900 text-white p-8 sm:p-10 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
                    <div class="flex items-center gap-4 mb-4">
                        <span class="material-symbols-outlined text-4xl text-yellow-400">${modulo.icono || "book"}</span>
                        <h1 class="text-3xl sm:text-4xl font-black">${modulo.nombre}</h1>
                    </div>
                    <p class="text-indigo-200 font-semibold text-base leading-relaxed">${this.formatTextWithLinks(modulo.descripcion)}</p>
                </div>

                <div class="space-y-8">
                    <h2 class="text-2xl font-black text-slate-900">Unidades de Aprendizaje</h2>
                    ${(modulo.detalle_unidades || [])
                      .map(
                        (u) => `
                        <div class="bg-white p-8 rounded-3xl border-4 border-slate-200 shadow-sm space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 font-black flex items-center justify-center text-xl flex-shrink-0">
                                    U${u.unidad}
                                </div>
                                <div>
                                    <h3 class="text-xl font-black text-slate-900">${u.nombre}</h3>
                                    <p class="text-sm font-medium text-slate-600 mt-1">${this.formatTextWithLinks(u.descripcion)}</p>
                                </div>
                            </div>

                            ${
                              u.flujo_completacion
                                ? `
                                <div class="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
                                    <h4 class="font-black text-slate-900 text-sm mb-2">${u.flujo_completacion.titulo}</h4>
                                    <p class="text-xs text-slate-600 font-medium mb-4">${this.formatTextWithLinks(u.flujo_completacion.descripcion)}</p>
                                    <div class="space-y-3">
                                        ${(u.flujo_completacion.orden || [])
                                          .map((act, i) => {
                                            const imgFix = this.fixImgPath(
                                              act.imagen_debajo,
                                            );
                                            return `
                                                <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                                                    <div class="flex items-center gap-3">
                                                        <span class="w-6 h-6 rounded-full ${act.tipo === "foro" ? "bg-orange-500" : "bg-pink-500"} text-white font-black text-xs flex items-center justify-center">${i + 1}</span>
                                                        <span class="font-bold text-xs uppercase tracking-wider ${act.tipo === "foro" ? "text-orange-600" : "text-pink-600"}">${act.tipo}</span>
                                                        <span class="font-extrabold text-sm text-slate-800">${act.titulo}</span>
                                                    </div>
                                                    ${imgFix ? `<img src="${imgFix}" alt="${act.titulo}" class="rounded-xl border border-slate-200 max-h-48 object-contain my-2">` : ""}
                                                </div>
                                            `;
                                          })
                                          .join("")}
                                    </div>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `;
  },

  // 4. CALENDARIO ACADÉMICO (calendario.json)
  async renderCalendario() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("calendario.json");

    if (!data || !data.calendario) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar calendario.json</div>`;
      return;
    }

    const cal = data.calendario;

    app.innerHTML = `
        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div class="bg-indigo-600 text-white p-8 sm:p-12 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
                <h1 class="text-3xl sm:text-5xl font-black mb-3">${cal.titulo}</h1>
                <p class="text-indigo-100 font-semibold text-base max-w-3xl">${this.formatTextWithLinks(cal.descripcion_corta)}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${
                  cal["semestre 1"] || cal.semestre_1
                    ? `
                    <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-6">
                        <h2 class="text-2xl font-black text-slate-900 border-b-4 border-amber-400 pb-2">
                            ${(cal["semestre 1"] || cal.semestre_1).nombre}
                        </h2>
                        <div class="space-y-4">
                            ${(
                              (cal["semestre 1"] || cal.semestre_1).bloques ||
                              []
                            )
                              .map(
                                (b) => `
                                    <div class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
                                        <h3 class="font-extrabold text-slate-900 text-sm mb-2">${b.nombre}</h3>
                                        <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
                                            <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                                                Inicio: ${this.formatDate(b.inicio)}
                                            </span>
                                            <span class="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800">
                                                Cierre: ${this.formatDate(b.cierre)}
                                            </span>
                                        </div>
                                    </div>
                                `,
                              )
                              .join("")}
                        </div>
                    </div>
                    `
                    : ""
                }

                ${
                  cal["semestre 2"] || cal.semestre_2
                    ? `
                    <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-6">
                        <h2 class="text-2xl font-black text-slate-900 border-b-4 border-indigo-400 pb-2">
                            ${(cal["semestre 2"] || cal.semestre_2).nombre}
                        </h2>
                        <div class="space-y-4">
                            ${(
                              (cal["semestre 2"] || cal.semestre_2).bloques ||
                              []
                            )
                              .map(
                                (b) => `
                                    <div class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
                                        <h3 class="font-extrabold text-slate-900 text-sm mb-2">${b.nombre}</h3>
                                        <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
                                            <span class="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700">
                                                Inicio: ${this.formatDate(b.inicio)}
                                            </span>
                                            <span class="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700">
                                                Cierre: ${this.formatDate(b.cierre)}
                                            </span>
                                        </div>
                                    </div>
                                `,
                              )
                              .join("")}
                        </div>
                    </div>
                    `
                    : ""
                }
            </div>
        </div>
    `;
  },
  // 7. GUÍA: CÓMO REALIZAR LOS MÓDULOS TRANSVERSALES (como_realizar_modulo.json)
  async renderComoRealizarModulos() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("como_realizar_modulo.json");

    if (!data || !data.como_realizar_mt) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar como_realizar_modulo.json</div>`;
      return;
    }

    const info = data.como_realizar_mt;

    app.innerHTML = `
        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm">
                ← Volver a Guías
            </a>

            <div class="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 sm:p-12 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
                <h1 class="text-3xl sm:text-5xl font-black mb-4">${info.titulo}</h1>
                <p class="text-indigo-100 font-semibold text-lg max-w-2xl">${this.formatTextWithLinks(info.descripcion_corta)}</p>
                <div class="mt-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                    <p class="text-sm font-medium text-indigo-100 leading-relaxed">${this.formatTextWithLinks(info.atencion)}</p>
                </div>
            </div>

            ${this._renderSeccionModulos(info.puntos_clave, "unidades", "📚", "Unidades de Aprendizaje", "Cada módulo se divide en unidades que contienen actividades específicas.", "#/modulos")}

            ${this._renderSeccionModulos(info.puntos_clave, "material_estudio", "📖", "Material de Estudio", "El material de estudio es la base para comprender los temas de cada módulo.", "#/modulos")}

            ${this._renderSeccionModulos(info.puntos_clave, "foros", "💬", "Foros de Discusión", "Los foros son espacios para reflexionar y compartir ideas con otros estudiantes.", "#/guias/foros")}

            ${this._renderSeccionModulos(info.puntos_clave, "cuestionarios", "📝", "Cuestionarios Evaluativos", "Los cuestionarios evalúan tu aprendizaje con preguntas de opción múltiple y más.", "#/guias/cuestionarios")}
        </div>
    `;
  },

  // Helper para renderizar cada sección de manera consistente
  _renderSeccionModulos(
    puntosClave,
    key,
    icono,
    titulo,
    descripcionBase,
    enlace,
  ) {
    // Buscar el item que corresponde a la key (unidades, material_estudio, foros, cuestionarios)
    const item = puntosClave?.find((p) => p[key] !== undefined);
    if (!item) return "";

    const contenido = item[key];
    if (!contenido || contenido.length === 0) return "";

    // Tomar el primer elemento de la sección (normalmente solo hay uno por sección)
    const data = contenido[0];

    // Determinar qué descripción usar
    let descripcion = data.explicacion || descripcionBase || "";
    let imagenArriba = data.imagen_arriba
      ? this.fixImgPath(data.imagen_arriba)
      : null;
    let imagenDebajo = data.imagen_debajo
      ? this.fixImgPath(data.imagen_debajo)
      : null;
    let verMas = data.ver_mas || data.ver_más || "";
    let tarjetaUrl = data.tarjeta_url || enlace || "#/modulos";

    return `
        <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-5">
            <div class="flex items-center gap-3">
                <span class="text-3xl">${icono}</span>
                <h2 class="text-2xl font-black text-slate-900">${titulo}</h2>
            </div>

            ${imagenArriba ? `<img src="${imagenArriba}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}

            <p class="text-sm font-medium text-slate-700 leading-relaxed">${this.formatTextWithLinks(descripcion)}</p>

            ${imagenDebajo ? `<img src="${imagenDebajo}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}

            ${
              verMas
                ? `
                <div class="pt-3 border-t-2 border-slate-100">
                    <p class="text-sm font-semibold text-slate-600 mb-3">${this.formatTextWithLinks(verMas)}</p>
                    <a href="${tarjetaUrl}" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_0_#3730a3] btn-3d transition-all">
                        <span>Ir a la guía detallada</span>
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            `
                : `
                <a href="${tarjetaUrl}" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_0_#3730a3] btn-3d transition-all">
                    <span>Ver más</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
            `
            }
        </div>
    `;
  },
  // 5. GUÍAS Y TUTORIALES (como_ingresar_a_campus, como_realizar_foro, como_realizar_cuestionario)
  // ÍNDICE DE GUÍAS - Pantalla principal con todas las guías disponibles
  async renderGuiasIndex() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div class="text-center max-w-3xl mx-auto space-y-3">
                <span class="px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 font-black text-xs uppercase">Centro de Ayuda</span>
                <h1 class="text-3xl sm:text-5xl font-black text-slate-900">📖 Guías y Tutoriales</h1>
                <p class="text-slate-600 font-bold text-base">Selecciona una guía para aprender paso a paso cómo realizar tus actividades.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Guía: Acceso al Campus -->
                <a href="#/guias/acceso-campus" class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">🔑</div>
                        <h3 class="text-xl font-black text-slate-900">Acceso al Campus Virtual</h3>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Aprende cómo ingresar al Campus Virtual del INATEC y obtener tus credenciales.</p>
                    <span class="inline-block mt-4 text-indigo-600 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Cómo realizar los Módulos -->
                <a href="#/guias/como-realizar-modulos" class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl">🎯</div>
                        <h3 class="text-xl font-black text-slate-900">Cómo realizar los Módulos</h3>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Conoce la estructura general de los módulos transversales y cómo abordarlos.</p>
                    <span class="inline-block mt-4 text-purple-600 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Foros -->
                <a href="#/guias/foros" class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-3xl">💬</div>
                        <h3 class="text-xl font-black text-slate-900">Cómo realizar un Foro</h3>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Aprende a participar en los foros de discusión de manera efectiva.</p>
                    <span class="inline-block mt-4 text-orange-600 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Cuestionarios -->
                <a href="#/guias/cuestionarios" class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl">📝</div>
                        <h3 class="text-xl font-black text-slate-900">Cómo realizar un Cuestionario</h3>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Conoce los diferentes tipos de preguntas y cómo resolver los cuestionarios.</p>
                    <span class="inline-block mt-4 text-pink-600 font-extrabold text-sm">Ver guía →</span>
                </a>
            </div>
        </div>
    `;
  },

  // GUÍA: ACCESO AL CAMPUS VIRTUAL
  async renderGuiaAcceso() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("como_ingresar_a_campus.json");
    const acc = data?.acceso_campus;

    if (!acc) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar la guía de acceso</div>`;
      return;
    }

    app.innerHTML = `
        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm">
                ← Volver a Guías
            </a>

            <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <h2 class="text-2xl font-black text-indigo-600 flex items-center gap-3">
                    <span>🔑</span> ${acc.titulo}
                </h2>
                <p class="text-slate-700 font-semibold text-sm">${this.formatTextWithLinks(acc.mensaje)}</p>

                ${(acc.video || []).map((v) => this.renderVideoContainer(v.youtube, v.titulo)).join("")}

                <p class="text-slate-600 font-bold text-xs uppercase tracking-wider">${this.formatTextWithLinks(acc.mensaje_sin_datos)}</p>

                <div class="space-y-6">
                    ${(acc.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        return `
                                <div class="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-3">
                                    <div class="flex items-center gap-3">
                                        <span class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm">${p.paso}</span>
                                        <h3 class="font-extrabold text-base text-slate-900">${p.titulo}</h3>
                                    </div>
                                    <p class="text-sm font-medium text-slate-600 leading-relaxed">${this.formatTextWithLinks(p.explicacion)}</p>
                                    
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-2xl border-2 border-slate-300 max-h-72 object-contain my-3">` : ""}

                                    ${
                                      p.docentes_tic
                                        ? `
                                        <div class="pt-2">
                                            <h4 class="font-black text-xs text-slate-500 uppercase tracking-wider mb-3">Docentes TIC de Apoyo:</h4>
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                ${p.docentes_tic
                                                  .map((doc) => {
                                                    const fotoFix =
                                                      this.fixImgPath(doc.foto);
                                                    return `
                                                        <a href="${doc.contacto}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 transition-all">
                                                            ${fotoFix ? `<img src="${fotoFix}" class="w-10 h-10 rounded-full object-cover">` : '<span class="text-2xl">👨‍🏫</span>'}
                                                            <div>
                                                                <span class="block font-black text-sm text-slate-900">${doc.nombre}</span>
                                                                <span class="text-xs text-emerald-600 font-bold">Contactar por WhatsApp →</span>
                                                            </div>
                                                        </a>
                                                    `;
                                                  })
                                                  .join("")}
                                            </div>
                                        </div>
                                    `
                                        : ""
                                    }
                                </div>
                            `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;
  },

  // GUÍA: CÓMO REALIZAR UN FORO
  async renderGuiaForos() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("como_realizar_foro.json");
    const fo = data?.foro;

    if (!fo) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar la guía de foros</div>`;
      return;
    }

    app.innerHTML = `
        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm">
                ← Volver a Guías
            </a>

            <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <div class="flex items-center gap-3">
                    ${this.fixImgPath(fo.imagen_icono) ? `<img src="${this.fixImgPath(fo.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">💬</span>'}
                    <h2 class="text-2xl font-black text-orange-600">${fo.titulo}</h2>
                </div>
                <p class="text-slate-600 font-medium text-sm">${this.formatTextWithLinks(fo.atencion)}</p>

                ${(fo.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}

                <div class="space-y-4">
                    ${(fo.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        return `
                                <div class="bg-orange-50/50 p-6 rounded-2xl border-2 border-orange-200 space-y-2">
                                    <h3 class="font-black text-base text-orange-950">Paso ${p.paso}: ${p.titulo}</h3>
                                    <p class="text-sm font-medium text-slate-700">${this.formatTextWithLinks(p.descripcion)}</p>
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-orange-300 max-h-60 object-contain my-2">` : ""}
                                </div>
                            `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;
  },

  // GUÍA: CÓMO REALIZAR UN CUESTIONARIO
  async renderGuiaCuestionarios() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("como_realizar_cuestionario.json");
    const cu = data?.cuestionario;

    if (!cu) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar la guía de cuestionarios</div>`;
      return;
    }

    app.innerHTML = `
        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm">
                ← Volver a Guías
            </a>

            <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <div class="flex items-center gap-3">
                    ${this.fixImgPath(cu.imagen_icono) ? `<img src="${this.fixImgPath(cu.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">📝</span>'}
                    <h2 class="text-2xl font-black text-pink-600">${cu.titulo}</h2>
                </div>
                <p class="text-slate-600 font-medium text-sm">${this.formatTextWithLinks(cu.atencion)}</p>

                ${(cu.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}

                <div class="space-y-4">
                    ${(cu.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        // Si tiene tipos_cuestionarios, renderizamos una sub-sección
                        const tiposHTML = p.tipos_cuestionarios
                          ? `
                                <div class="mt-4 space-y-4">
                                    <h4 class="font-black text-pink-700 text-sm uppercase tracking-wider">Tipos de preguntas:</h4>
                                    ${p.tipos_cuestionarios
                                      .map(
                                        (t) => `
                                        <div class="bg-white p-4 rounded-xl border-2 border-pink-100 space-y-2">
                                            <h5 class="font-black text-sm text-pink-800">${t.tipo}</h5>
                                            <p class="text-xs text-slate-600 leading-relaxed">${this.formatTextWithLinks(t.descripcion)}</p>
                                            ${t.imagen_tipo ? `<img src="${this.fixImgPath(t.imagen_tipo)}" alt="${t.tipo}" class="rounded-lg border border-pink-200 max-h-48 object-contain my-1">` : ""}
                                        </div>
                                    `,
                                      )
                                      .join("")}
                                </div>
                            `
                          : "";

                        return `
                                <div class="bg-pink-50/50 p-6 rounded-2xl border-2 border-pink-200 space-y-2">
                                    <h3 class="font-black text-base text-pink-950">Paso ${p.paso}: ${p.titulo}</h3>
                                    <p class="text-sm font-medium text-slate-700">${this.formatTextWithLinks(p.descripcion)}</p>
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-pink-300 max-h-60 object-contain my-2">` : ""}
                                    ${tiposHTML}
                                </div>
                            `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;
  },

  // 6. BUSCADOR DE CREDENCIALES (credenciales.json + estudiantes.json)
  async renderCredenciales() {
    const app = document.getElementById("app");

    // Cargar ambos archivos
    const [credData, estudiantesData] = await Promise.all([
      this.fetchJSON("/assets/data/credenciales.json"),
      this.fetchJSON("/assets/data/db/estudiantes.json"),
    ]);

    const info = credData?.credenciales;
    const estudiantes = estudiantesData || [];

    if (!info) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar credenciales.json</div>`;
      return;
    }

    // Estado del buscador (sin centro ni ingreso)
    let estado = {
      paso: 1,
      turno: "",
      carrera: "",
      grupo: "",
      estudianteSeleccionado: null,
      historial: [],
    };

    // Función para volver atrás
    const volverAtras = () => {
      if (estado.historial.length > 0) {
        const pasoAnterior = estado.historial.pop();
        estado.paso = pasoAnterior;
        renderizarBuscador();
      }
    };

    // Función para renderizar el contenido del buscador
    const renderizarBuscador = () => {
      const container = document.getElementById("buscador-container");
      if (!container) return;

      let html = "";

      switch (estado.paso) {
        case 1:
          html = renderPaso1();
          break;
        case 2:
          html = renderPaso2();
          break;
        case 3:
          html = renderPaso3();
          break;
        case 4:
          html = renderPaso4();
          break;
        default:
          html = renderPaso1();
      }

      container.innerHTML = html;
    };

    // ========== RENDER DE CADA PASO ==========

    // Paso 1: Seleccionar turno (pantalla 1 en JSON)
    const renderPaso1 = () => {
      const turnos = [...new Set(estudiantes.map((e) => e.turno))];

      return `
            <div class="space-y-6">
                <div class="flex items-center gap-3 mb-4">
                    <span class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-black">1</span>
                    <h3 class="text-xl font-black text-slate-900">${info.pantallas[0]?.mensaje || "Selecciona tu turno"}</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${turnos
                      .map(
                        (turno) => `
                        <button onclick="window._buscadorSeleccionarTurno('${turno}')" 
                                class="p-6 rounded-2xl bg-slate-50 border-3 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-extrabold text-slate-800 text-center">
                            <span class="text-2xl block mb-2">🕐</span>
                            ${turno.charAt(0).toUpperCase() + turno.slice(1)}
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `;
    };

    // Paso 2: Seleccionar carrera y grupo (pantalla 2 en JSON)
    const renderPaso2 = () => {
      const grupos = estudiantes
        .filter((e) => e.turno === estado.turno)
        .reduce((acc, e) => {
          const key = `${e.carrera}-${e.grupo}`;
          if (!acc[key]) {
            acc[key] = { carrera: e.carrera, grupo: e.grupo };
          }
          return acc;
        }, {});

      const opciones = Object.values(grupos);

      return `
            <div class="space-y-6">
                <div class="flex items-center gap-3 mb-4">
                    <span class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-black">2</span>
                    <h3 class="text-xl font-black text-slate-900">${info.pantallas[1]?.mensaje || "Selecciona tu carrera y grupo"}</h3>
                </div>
                <div class="space-y-3">
                    ${opciones
                      .map(
                        (op) => `
                        <button onclick="window._buscadorSeleccionarCarrera('${op.carrera}', '${op.grupo}')" 
                                class="w-full p-4 rounded-2xl bg-slate-50 border-3 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-extrabold text-slate-800 text-left flex justify-between items-center">
                            <div>
                                <span class="block text-sm font-bold text-slate-900">${op.carrera.toUpperCase()}</span>
                                <span class="text-xs text-slate-500">Grupo: ${op.grupo}</span>
                            </div>
                            <span class="text-emerald-500">→</span>
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `;
    };

    // Paso 3: Lista de estudiantes (pantalla 3 en JSON)
    const renderPaso3 = () => {
      const lista = estudiantes
        .filter(
          (e) =>
            e.turno === estado.turno &&
            e.carrera === estado.carrera &&
            e.grupo === estado.grupo,
        )
        .sort((a, b) => a.nombres.localeCompare(b.nombres));

      return `
            <div class="space-y-6">
                <div class="flex items-center gap-3 mb-4">
                    <span class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-black">3</span>
                    <h3 class="text-xl font-black text-slate-900">${info.pantallas[2]?.mensaje || "Busca tu nombre"}</h3>
                </div>
                <div class="bg-slate-50 rounded-2xl border-2 border-slate-200 max-h-96 overflow-y-auto">
                    ${
                      lista.length > 0
                        ? lista
                            .map(
                              (e) => `
                        <button onclick="window._buscadorSeleccionarEstudiante('${e.nombres}', '${e.apellidos}', '${e.usuario}', '${e.contrasena}')" 
                                class="w-full p-4 border-b border-slate-200 hover:bg-emerald-50 transition-all flex justify-between items-center text-left">
                            <span class="font-medium text-slate-800">${e.nombres} ${e.apellidos}</span>
                            <span class="text-emerald-600 font-bold text-sm">${info.pantallas[2]?.btn_ver || "Ver"} →</span>
                        </button>
                    `,
                            )
                            .join("")
                        : `
                        <div class="p-8 text-center text-slate-500">
                            <span class="text-3xl block mb-2">😕</span>
                            <p>No se encontraron estudiantes con estos filtros</p>
                        </div>
                    `
                    }
                </div>
                <div class="text-xs text-slate-400 text-center">
                    Mostrando ${lista.length} estudiante${lista.length !== 1 ? "s" : ""}
                </div>
            </div>
        `;
    };

    // Paso 4: Mostrar credenciales (pantalla 4 en JSON)
    const renderPaso4 = () => {
      const estudiante = estado.estudianteSeleccionado;
      if (!estudiante) {
        return `<div class="p-8 text-center text-rose-600">Error: No se seleccionó ningún estudiante</div>`;
      }

      return `
            <div class="space-y-6 text-center">
                <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl">
                    🎉
                </div>
                <div>
                    <h3 class="text-2xl font-black text-slate-900">
                        ${info.pantallas[3]?.saludo?.saludo || "¡Hola, "} 
                        <span class="text-emerald-600">${estudiante.nombres}</span>!
                    </h3>
                    <p class="text-slate-600 font-medium mt-2">${info.pantallas[3]?.mensaje || "Tus credenciales de acceso al Campus Virtual son:"}</p>
                </div>

                <div class="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-4 max-w-md mx-auto">
                    <div class="bg-white p-4 rounded-xl border-2 border-slate-200">
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">${info.pantallas[3]?.usuario?.titulo || "Usuario:"}</p>
                        <p class="text-xl font-black text-indigo-600 break-all">${estudiante.usuario}</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border-2 border-slate-200">
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">${info.pantallas[3]?.contrasena?.titulo || "Contraseña:"}</p>
                        <p class="text-xl font-black text-emerald-600">${estudiante.contrasena}</p>
                    </div>
                </div>

                <div class="bg-amber-50 p-4 rounded-xl border-2 border-amber-200 max-w-md mx-auto text-left">
                    <p class="text-xs font-bold text-amber-800 mb-1">⚠️ Recomendación importante:</p>
                    <p class="text-xs text-amber-700 leading-relaxed">
                        Al ingresar por primera vez, el sistema te solicitará cambiar tu contraseña por seguridad. 
                        Te recomendamos elegir una contraseña segura que recuerdes fácilmente.
                    </p>
                </div>

                <div class="pt-4">
                    <button onclick="window._buscadorReiniciar()" 
                            class="btn-3d px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-[0_6px_0_#047857]">
                        ${info.pantallas[3]?.btn_ok || "Entendido"}
                    </button>
                </div>
            </div>
        `;
    };

    // ========== FUNCIONES DE SELECCIÓN ==========

    window._buscadorSeleccionarTurno = (turno) => {
      estado.turno = turno;
      estado.historial.push(1);
      estado.paso = 2;
      renderizarBuscador();
    };

    window._buscadorSeleccionarCarrera = (carrera, grupo) => {
      estado.carrera = carrera;
      estado.grupo = grupo;
      estado.historial.push(2);
      estado.paso = 3;
      renderizarBuscador();
    };

    window._buscadorSeleccionarEstudiante = (
      nombres,
      apellidos,
      usuario,
      contrasena,
    ) => {
      estado.estudianteSeleccionado = {
        nombres: `${nombres} ${apellidos}`,
        usuario: usuario,
        contrasena: contrasena,
      };
      estado.historial.push(3);
      estado.paso = 4;
      renderizarBuscador();
    };

    window._buscadorReiniciar = () => {
      estado = {
        paso: 1,
        turno: "",
        carrera: "",
        grupo: "",
        estudianteSeleccionado: null,
        historial: [],
      };
      renderizarBuscador();
    };

    window._buscadorVolver = () => {
      volverAtras();
    };

    // ========== RENDER PRINCIPAL ==========

    app.innerHTML = `
        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div class="bg-emerald-600 text-white p-8 sm:p-10 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] text-center space-y-3">
                <span class="text-4xl">🔑</span>
                <h1 class="text-3xl sm:text-5xl font-black">${info.titulo}</h1>
                <p class="text-emerald-100 font-medium text-base max-w-xl mx-auto">${this.formatTextWithLinks(info.descripcion_corta)}</p>
            </div>

            <div class="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
                <!-- Barra de progreso -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-slate-500">Paso</span>
                        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm">${estado.paso}/4</span>
                    </div>
                    ${
                      estado.paso > 1
                        ? `
                        <button onclick="window._buscadorVolver()" 
                                class="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
                            ← Volver
                        </button>
                    `
                        : ""
                    }
                </div>

                <!-- Contenedor dinámico del buscador -->
                <div id="buscador-container">
                    ${renderPaso1()}
                </div>
            </div>

            <!-- Mensaje de ayuda -->
            <div class="text-center">
                <p class="text-xs text-slate-400">
                    💡 Si tienes problemas para encontrar tus credenciales, contacta a tu <strong>Docente TIC</strong> de apoyo.
                </p>
            </div>
        </div>
    `;

    // Renderizar el primer paso
    renderizarBuscador();
  },

  // Utility para generar slugs
  slugify(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  },
};

// Inicializar la SPA
App.init();
