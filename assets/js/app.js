const App = {
  cache: {},

  // Mapa local de iconos (elimina dependencia de fuentes externas)
  iconMap: {
    account_balance: "🏛️",
    agriculture: "🌱",
    analytics: "📊",
    code: "💻",
    communication: "💬",
    group: "👥",
    groups: "👥",
    more: "✨",
    palette: "🎨",
    pets: "🐾",
    psychology: "🧠",
    social_leaderboard: "📈",
    auto_stories: "📖",
    badge: "🪪",
    diversity_3: "🌍",
    eco: "🌿",
    flag: "🚩",
    gavel: "⚖️",
    handshake: "🤝",
    history_edu: "📜",
    menu_book: "📚",
    military_tech: "🎖️",
    museum: "🏛️",
    potted_plant: "🪴",
    record_voice_over: "🗣️",
    theater_comedy: "🎭",
    verified: "✅",
    warning: "⚠️",
    work: "💼",
    star: "⭐",
    book: "📘",
  },

  icon(name, fallback = "⭐") {
    return this.iconMap[name] || fallback;
  },

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

  // Componente reutilizable para videos (YouTube embebido o MP4 local) o placeholder
  renderVideoContainer(input, title = "Video Explicativo") {
    // Acepta string (URL) o el objeto del JSON { youtube, descarga, titulo }
    const video = typeof input === "object" && input !== null ? input : { youtube: input };
    const titulo = video.titulo || title;
    const embedUrl = this.getYouTubeEmbedURL(video.youtube);

    if (embedUrl) {
      return `
                <div class="my-6 bg-slate-900 p-3 rounded-3xl border-4 border-slate-900 shadow-xl">
                    <div class="video-responsive-wrapper">
                        <iframe src="${embedUrl}" title="${titulo}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    ${video.descarga ? `<a href="${this.fixImgPath(video.descarga)}" download class="inline-flex items-center gap-2 mt-3 text-xs font-bold text-indigo-200 hover:text-white">⬇️ Descargar versión ligera (MP4)</a>` : ""}
                </div>
            `;
    }

    if (video.descarga) {
      return `
                <div class="my-6 bg-slate-900 p-3 rounded-3xl border-4 border-slate-900 shadow-xl">
                    <video controls preload="none" playsinline class="w-full rounded-2xl" title="${titulo}">
                        <source src="${this.fixImgPath(video.descarga)}" type="video/mp4" />
                        Tu navegador no puede reproducir este video.
                    </video>
                    <a href="${this.fixImgPath(video.descarga)}" download class="inline-flex items-center gap-2 mt-3 text-xs font-bold text-indigo-200 hover:text-white">⬇️ Descargar video</a>
                </div>
            `;
    }

    return this.renderMediaPlaceholder({
      type: "video",
      title: titulo,
      context: titulo,
      desc: "No se ha proporcionado una URL embebible ni un archivo MP4 local para este video.",
      suggested: "Sube el video a YouTube (o plataforma embebible) y pega la URL en el campo 'youtube', o agrega el MP4 en la ruta indicada.",
    });
  },

  // Placeholder para recursos multimedia faltantes (sin inventar contenido)
  renderMediaPlaceholder({ type = "image", title = "Recurso pendiente", desc = "", suggested = "", context = "" } = {}) {
    const icons = {
      image: "🖼️",
      infografia: "📊",
      video: "🎬",
      audio: "🎧",
      captura: "📸",
      diagrama: "🗺️",
      archivo: "📎",
    };
    const icon = icons[type] || "🖼️";
    const descText =
      desc ||
      "No hay recurso multimedia disponible para este apartado. Este espacio se deja intencionalmente para que lo proporciones manualmente.";
    const suggestedText =
      suggested ||
      "Pásame el archivo o URL embebible (ej. YouTube) con la descripción de lo que debe mostrar para integrarlo.";
    const ctx = context || title || "";
    return `
            <div class="my-4 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/80 text-amber-900 flex items-start gap-3" role="note" aria-label="Recurso multimedia pendiente">
                <div class="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center text-xl flex-shrink-0">${icon}</div>
                <div class="space-y-1">
                    <div class="font-extrabold text-sm">FALTA RECURSO: ${String(type).toUpperCase()}${ctx ? " — " + ctx : ""}</div>
                    <div class="text-xs font-semibold leading-relaxed">${descText}</div>
                    <div class="text-[11px] font-medium leading-relaxed text-amber-800/90">Acción: ${suggestedText}</div>
                    <div class="text-[11px] text-amber-700/80">Ruta sugerida (si es imagen/captura): assets/img/pasos_otros/[sección]/nombre-descriptivo.png</div>
                </div>
            </div>
            <!-- FALTA RECURSO: tipo=${type} | contexto=${ctx.replace(/"/g, "'")} | acción=subir a YouTube/plataforma embebible o agregar archivo local -->
        `;
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

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };

    btn.addEventListener("click", () => {
      setOpen(menu.classList.contains("hidden"));
    });

    // Ocultar menú móvil al hacer clic en un enlace
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    // Cerrar con Escape y al navegar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.classList.contains("hidden")) {
        setOpen(false);
        btn.focus();
      }
    });
    window.addEventListener("hashchange", () => setOpen(false));
  },

  // Anuncia la ruta actual a lectores de pantalla y ajusta el foco
  announceRoute() {
    const live = document.getElementById("route-announcer");
    const app = document.getElementById("app");
    const heading = app?.querySelector("h1");
    if (live) {
      live.textContent = heading?.textContent?.trim() || "Contenido actualizado";
    }
    if (app) app.focus({ preventScroll: true });
    this.renderLearnIndex();
  },

  toggleLearnIndex() {
    const panel = document.getElementById("learn-index");
    if (!panel) return;
    panel.classList.toggle("hidden");
    this.renderLearnIndex();
  },

  async renderLearnIndex() {
    const panel = document.getElementById("learn-index");
    const toggle = document.getElementById("learn-toggle");
    const list = document.getElementById("learn-index-list");
    if (!panel || !toggle || !list) return;
    const hash = window.location.hash || "#/";
    const isGuide = hash.startsWith("#/guias") || hash === "#/ruta" || hash === "#/aprender" || hash === "#/para-que" || hash === "#/credenciales";
    toggle.classList.toggle("hidden", !isGuide);
    if (!isGuide) {
      panel.classList.add("hidden");
      return;
    }
    const data = await this.fetchJSON("ruta_aprendizaje.json");
    if (!data || !data.lecciones) {
      list.innerHTML = `<div class="p-4 text-xs text-slate-600">No hay índice disponible</div>`;
      return;
    }
    let completadas = [];
    try { completadas = JSON.parse(localStorage.getItem("muraltic-ruta") || "[]"); } catch (e) {}
    list.innerHTML = data.lecciones.map((l) => {
      const done = completadas.includes(l.id);
      const active = hash === l.ruta;
      return `<a href="${l.ruta}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 ${active ? "bg-indigo-50" : ""}"><span class="w-7 h-7 rounded-lg ${done ? "bg-emerald-600" : "bg-slate-200 text-slate-700"} text-white flex items-center justify-center text-xs">${done ? "✓" : l.id}</span><div class="flex-1"><div class="text-xs font-extrabold text-slate-900">${l.titulo}</div></div></a>`;
    }).join("");
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

  // ===== Progreso persistente por guía (localStorage) =====
  progressKey() {
    return "muraltic-progress:" + (window.location.hash || "#/");
  },

  getProgress() {
    try {
      const raw = localStorage.getItem(this.progressKey());
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch (e) {
      return [];
    }
  },

  setStep(step, done) {
    try {
      const set = new Set(this.getProgress());
      if (done) set.add(String(step));
      else set.delete(String(step));
      localStorage.setItem(this.progressKey(), JSON.stringify([...set]));
    } catch (e) {}
  },

  resetProgress() {
    try {
      localStorage.removeItem(this.progressKey());
    } catch (e) {}
    this.route();
  },

  stepToggleHTML(step) {
    const done = this.getProgress().includes(String(step));
    return `
      <button type="button" data-progress-step="${step}" data-done="${done}"
        onclick="App.toggleStep(this)"
        class="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all touch-target ${done ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}">
        <span>${done ? "✓" : "○"}</span>
        <span class="step-label">${done ? "Hecho" : "Marcar como hecho"}</span>
      </button>
    `;
  },

  toggleStep(el) {
    const step = el.getAttribute("data-progress-step");
    const done = el.getAttribute("data-done") !== "true";
    this.setStep(step, done);
    el.setAttribute("data-done", String(done));
    el.classList.toggle("bg-emerald-600", done);
    el.classList.toggle("text-white", done);
    el.classList.toggle("bg-slate-200", !done);
    el.classList.toggle("hover:bg-slate-300", !done);
    el.querySelector("span").textContent = done ? "✓" : "○";
    const label = el.querySelector(".step-label");
    if (label) label.textContent = done ? "Hecho" : "Marcar como hecho";
    this.updateProgressUI();
  },

  updateProgressUI() {
    const buttons = Array.from(document.querySelectorAll("[data-progress-step]"));
    const total = buttons.length;
    const done = buttons.filter((b) => b.getAttribute("data-done") === "true").length;
    const countEl = document.querySelector("[data-progress-count]");
    const barEl = document.querySelector("[data-progress-bar]");
    if (countEl) countEl.textContent = `${done} de ${total}`;
    if (barEl) barEl.style.width = total ? `${Math.round((done / total) * 100)}%` : "0%";
  },

  progressPanel(total) {
    const done = Math.min(this.getProgress().length, total);
    return `
      <div class="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-2" aria-live="polite">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-extrabold text-slate-900">Has aprendido <span data-progress-count>${done} de ${total}</span> pasos</p>
          <button type="button" onclick="App.resetProgress()" class="text-xs font-bold text-slate-600 hover:text-indigo-700 touch-target">Reiniciar</button>
        </div>
        <div class="w-full h-3 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}">
          <div data-progress-bar class="h-full bg-emerald-500 transition-all duration-300" style="width:${total ? Math.round((done / total) * 100) : 0}%"></div>
        </div>
      </div>
    `;
  },

  // Audio guiado a demanda
  playGuideAudio(btn) {
    const container = btn.closest("[data-guide-step]");
    const audio = container?.querySelector("audio[data-guide-audio]");
    const highlights = container?.querySelectorAll("[data-highlight]");
    if (!audio) return;
    if (audio.paused) {
      highlights?.forEach((h) => h.classList.add("ring-4", "ring-amber-400", "ring-offset-2"));
      audio.play().catch(() => {});
      btn.querySelector(".audio-label").textContent = "Pausar explicación";
    } else {
      audio.pause();
      btn.querySelector(".audio-label").textContent = "Escuchar explicación (opcional)";
    }
    audio.onended = () => {
      highlights?.forEach((h) => h.classList.remove("ring-4", "ring-amber-400", "ring-offset-2"));
      if (btn.querySelector(".audio-label")) btn.querySelector(".audio-label").textContent = "Escuchar explicación (opcional)";
    };
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
    } else if (hash === "#/ruta" || hash === "#/aprender") {
      await this.renderRutaAprendizaje();
    } else if (hash === "#/credenciales") {
      await this.renderCredenciales();
    } else {
      await this.renderHome();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.announceRoute();
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
            <div class="animate-pop space-y-10">
                <section class="bg-gradient-to-b from-indigo-900 via-indigo-800 to-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b-4 border-yellow-400">
                    <div class="max-w-4xl mx-auto text-center space-y-5">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-yellow-400 text-indigo-950 font-black text-xs uppercase tracking-widest shadow-md">
                            ${gen.badge || "MURAL TIC VIRTUAL"}
                        </span>
                        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            Aprende a usar el Campus Virtual paso a paso
                        </h1>
                        <p class="text-lg sm:text-xl font-bold text-indigo-100 max-w-2xl mx-auto">
                            Para usarlo por primera vez, sin rodeos y con voz guía.
                        </p>
                        <p class="text-base text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
                            ${this.formatTextWithLinks(gen.descripcion_corta || "")}
                        </p>

                        <div class="pt-4 flex flex-wrap justify-center gap-3">
                            <a href="#/ruta" class="btn-3d px-7 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-indigo-950 font-black text-base shadow-[0_6px_0_#ca8a04] touch-target">
                                <span>🗺️ Empezar ruta de aprendizaje</span>
                            </a>
                            <a href="#/guias/acceso-campus" class="btn-3d px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base border-2 border-white/20 touch-target">
                                <span>🔑 Aprender a entrar</span>
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
                                        <span class="text-3xl">${this.icon(b.icono, "⭐")}</span>
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
                                            <span class="text-3xl">${this.icon(m.icono, "📚")}</span>
                                        </div>
                                        <span class="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs">
                                            ${m.unidades_a_completar || m.detalle_unidades?.length || 0} Unidades
                                        </span>
                                    </div>
                                    <h3 class="text-2xl font-black text-slate-900 mb-3">${m.nombre}</h3>
                                    <p class="text-sm font-medium text-slate-600 leading-relaxed mb-6">${this.formatTextWithLinks(m.descripcion)}</p>
                                </div>
                                <a href="#/modulo/${slug}" class="btn-3d w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-black text-center text-sm shadow-[0_4px_0_#312e81] block touch-target">
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
                        <span class="text-4xl text-yellow-400">${this.icon(modulo.icono, "📘")}</span>
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
                                                    ${imgFix ? `<img src="${imgFix}" alt="${act.titulo}" class="rounded-xl border border-slate-200 max-h-48 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: act.titulo, context: `Flujo completación - ${act.titulo}`, desc: "Falta captura de pantalla para ilustrar este paso.", suggested: "Agrega una captura clara mostrando el botón/acción correspondiente." })}
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
    const showSem1 = cal.show_sem1 !== false;
    const showSem2 = cal.show_sem2 !== false;
    const sem1 = cal["semestre 1"] || cal.semestre_1;
    const sem2 = cal["semestre 2"] || cal.semestre_2;

    app.innerHTML = `
        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div class="bg-indigo-700 text-white p-6 sm:p-10 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
                <h1 class="text-3xl sm:text-5xl font-black mb-3">${cal.titulo}</h1>
                <p class="text-indigo-50 font-semibold text-base max-w-3xl">${this.formatTextWithLinks(cal.descripcion_corta || "")}</p>
            </div>

            <div class="grid grid-cols-1 ${showSem1 && showSem2 ? 'md:grid-cols-2' : ''} gap-8">
                ${
                  showSem1 && sem1
                    ? `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-6">
                        <h2 class="text-2xl font-black text-slate-900 border-b-4 border-amber-400 pb-2">
                            ${sem1.nombre}
                        </h2>
                        <div class="space-y-4">
                            ${(sem1.bloques || [])
                              .map(
                                (b) => `
                                    <div class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
                                        <h3 class="font-extrabold text-slate-900 text-sm mb-2">${b.nombre}</h3>
                                        <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
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
                  showSem2 && sem2
                    ? `
                    <div class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-6">
                        <h2 class="text-2xl font-black text-slate-900 border-b-4 border-indigo-400 pb-2">
                            ${sem2.nombre}
                        </h2>
                        <div class="space-y-4">
                            ${(sem2.bloques || [])
                              .map(
                                (b) => `
                                    <div class="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
                                        <h3 class="font-extrabold text-slate-900 text-sm mb-2">${b.nombre}</h3>
                                        <div class="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
                                            <span class="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800">
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
            </div>

            <div class="text-center">
                <a href="admin.html" class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-700">Panel Admin Local</a>
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
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm touch-target">
                ← Volver a Guías
            </a>

            <div class="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-6 sm:p-10 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
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

    const capa1 = `<p class="text-sm font-extrabold text-slate-900">Toca/Ver: ${titulo}</p>`;
    const capa2 = `
        <details class="guia-details group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
            <summary class="cursor-pointer px-4 py-3 font-extrabold text-sm text-indigo-700 flex items-center justify-between gap-2">
                <span>Ver explicación con analogía y solución de errores</span>
                <span class="text-lg transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
            </summary>
            <div class="px-4 pb-4 pt-2 space-y-3">
                <p class="text-sm font-medium text-slate-700 leading-relaxed">${this.formatTextWithLinks(descripcion)}</p>
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                    <strong>Analogía:</strong> Los módulos transversales son como asignaturas complementarias que te ayudan a usar mejor las herramientas para aprender en cualquier curso.
                </div>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                    <strong>Si hay error:</strong> Lee con calma cada paso, sigue el orden y usa las guías detalladas si no encuentras el botón.
                </div>
                ${imagenArriba ? `<img src="${imagenArriba}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: titulo, context: `${titulo} (arriba)`, desc: "Falta imagen/captura ilustrativa para este apartado.", suggested: "Agrega una captura mostrando la ubicación/elemento relevante." })}
                ${imagenDebajo ? `<img src="${imagenDebajo}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: titulo, context: `${titulo} (debajo)`, desc: "Falta imagen/captura ilustrativa para este apartado.", suggested: "Agrega una captura mostrando el paso o resultado." })}
            </div>
        </details>
    `;

    return `
        <article class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-4">
            <header class="flex items-center gap-3">
                <span class="text-3xl">${icono}</span>
                <h2 class="text-2xl font-black text-slate-900">${titulo}</h2>
            </header>

            ${capa1}
            ${capa2}

            ${
              verMas
                ? `
                <div class="pt-3 border-t-2 border-slate-100">
                    <p class="text-sm font-semibold text-slate-600 mb-3">${this.formatTextWithLinks(verMas)}</p>
                    <a href="${tarjetaUrl}" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_0_#3730a3] btn-3d transition-all touch-target">
                        <span>Ir a la guía detallada</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            `
                : `
                <a href="${tarjetaUrl}" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_0_#3730a3] btn-3d transition-all touch-target">
                    <span>Ver más</span>
                    <span aria-hidden="true">→</span>
                </a>
            `
            }
        </article>
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
                <a href="#/guias/acceso-campus" class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful touch-target">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl flex-shrink-0">🔑</div>
                        <h2 class="text-xl font-black text-slate-900">Acceso al Campus Virtual</h2>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Aprende cómo ingresar al Campus Virtual del INATEC y obtener tus credenciales.</p>
                    <span class="inline-block mt-4 text-indigo-700 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Cómo realizar los Módulos -->
                <a href="#/guias/como-realizar-modulos" class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful touch-target">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl flex-shrink-0">🎯</div>
                        <h2 class="text-xl font-black text-slate-900">Cómo realizar los Módulos</h2>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Conoce la estructura general de los módulos transversales y cómo abordarlos.</p>
                    <span class="inline-block mt-4 text-purple-700 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Foros -->
                <a href="#/guias/foros" class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful touch-target">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-3xl flex-shrink-0">💬</div>
                        <h2 class="text-xl font-black text-slate-900">Cómo realizar un Foro</h2>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Aprende a participar en los foros de discusión de manera efectiva.</p>
                    <span class="inline-block mt-4 text-orange-700 font-extrabold text-sm">Ver guía →</span>
                </a>

                <!-- Guía: Cuestionarios -->
                <a href="#/guias/cuestionarios" class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] hover:translate-y-[-4px] transition-all card-playful touch-target">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center text-3xl flex-shrink-0">📝</div>
                        <h2 class="text-xl font-black text-slate-900">Cómo realizar un Cuestionario</h2>
                    </div>
                    <p class="text-sm font-medium text-slate-600">Conoce los diferentes tipos de preguntas y cómo resolver los cuestionarios.</p>
                    <span class="inline-block mt-4 text-pink-700 font-extrabold text-sm">Ver guía →</span>
                </a>
            </div>

            <!-- Glosario Visual -->
            <section class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_6px_0_#0f172a] space-y-4">
                <header class="flex items-center gap-3">
                    <span class="text-3xl">🧭</span>
                    <h2 class="text-2xl font-black text-slate-900">Glosario Visual de Iconos del Campus Virtual</h2>
                </header>
                <p class="text-sm font-medium text-slate-600">Traducción rápida de iconos que aparecen en el MOOC.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-xl">⚙️</span>
                        <div>
                            <div class="font-extrabold text-sm text-slate-900">Engranaje</div>
                            <div class="text-xs text-slate-600">Configuración / Ajustes</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-xl">🔔</span>
                        <div>
                            <div class="font-extrabold text-sm text-slate-900">Campana</div>
                            <div class="text-xs text-slate-600">Avisos y Notificaciones</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-xl">📎</span>
                        <div>
                            <div class="font-extrabold text-sm text-slate-900">Clip</div>
                            <div class="text-xs text-slate-600">Adjuntar / Subir archivo</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-xl">🔍</span>
                        <div>
                            <div class="font-extrabold text-sm text-slate-900">Lupa</div>
                            <div class="text-xs text-slate-600">Buscar</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span class="text-xl">👤</span>
                        <div>
                            <div class="font-extrabold text-sm text-slate-900">Silueta</div>
                            <div class="text-xs text-slate-600">Tu cuenta / Perfil</div>
                        </div>
                    </div>
                </div>
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                    <strong>Analogía:</strong> Estos iconos son como señales en la escuela: te indican dónde encontrar cosas importantes.
                </div>
            </section>
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
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm touch-target">
                ← Volver a Guías
            </a>

            <div class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <h1 class="text-2xl sm:text-3xl font-black text-indigo-700 flex items-center gap-3">
                    <span>🔑</span> ${acc.titulo}
                </h1>
                <p class="text-slate-700 font-semibold text-sm">${this.formatTextWithLinks(acc.mensaje)}</p>

                ${(acc.video || []).map((v) => this.renderVideoContainer(v, v.titulo)).join("")}

                <p class="text-slate-600 font-bold text-xs uppercase tracking-wider">${this.formatTextWithLinks(acc.mensaje_sin_datos)}</p>

                ${this.progressPanel((acc.pasos || []).length)}

                <div class="space-y-6">
                    ${(acc.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        const capa1 = `<p class="text-sm font-extrabold text-slate-900">Toca/Selecciona: ${p.titulo.replace(/Paso\s*\d+[:\-]?\s*/i, '').trim() || p.titulo}</p>`;
                        const capa2 = `
                            <details class="guia-details group rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
                                <summary class="cursor-pointer px-4 py-3 font-extrabold text-sm text-indigo-700 flex items-center justify-between gap-2">
                                    <span>Ver explicación con analogía y solución de errores</span>
                                    <span class="text-lg transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                                </summary>
                                <div class="px-4 pb-4 pt-2 space-y-3">
                                    <p class="text-sm font-medium text-slate-700 leading-relaxed">${this.formatTextWithLinks(p.explicacion)}</p>
                                    <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                                        <strong>Analogía:</strong> Acceder al Campus Virtual es como mostrar tu carnet de estudiante en la puerta para entrar al salón. Solo necesitas tus datos correctos para pasar.
                                    </div>
                                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                                        <strong>Si hay error:</strong> Revisa usuario/contraseña (mayúsculas/minúsculas), conexión y vuelve a intentar. Si persiste, solicita apoyo al Docente TIC.
                                    </div>
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-2xl border-2 border-slate-300 max-h-72 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: p.titulo, context: `Acceso al Campus - Paso ${p.paso}`, desc: "Falta captura de pantalla para ilustrar este paso.", suggested: "Agrega una captura clara mostrando el elemento/botón indicado." })}
                                </div>
                            </details>
                        `;
                        const audioUrl = p.audio?.url || "";
                        const audioTrans = p.audio?.transcripcion || p.audio?.guion || "";
                        return `
                                <article class="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-slate-200 space-y-3" data-guide-step>
                                    <header class="flex items-center gap-3">
                                        <span class="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm flex-shrink-0" data-highlight>${p.paso}</span>
                                        <h2 class="font-extrabold text-base text-slate-900" data-highlight>${p.titulo}</h2>
                                    </header>
                                    ${capa1}
                                    ${capa2}
                                    <div class="flex flex-wrap items-center gap-2">
                                        ${audioUrl ? `<button type="button" onclick="App.playGuideAudio(this)" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs touch-target"><span>🔊</span><span class="audio-label">Escuchar explicación (opcional)</span></button>` : `<button type="button" disabled class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-300 text-slate-600 font-extrabold text-xs opacity-70">🔊 Audio pendiente (agrega URL MP3)</button>`}
                                        ${this.stepToggleHTML(p.paso)}
                                    </div>
                                    ${audioUrl ? `<audio data-guide-audio src="${audioUrl}" preload="none"></audio>` : ""}
                                    ${audioTrans ? `<details class="rounded-xl border border-slate-200 bg-white"><summary class="px-4 py-2 font-bold text-xs text-slate-700 cursor-pointer">Ver transcripción</summary><div class="px-4 pb-3 text-xs text-slate-600 leading-relaxed">${this.formatTextWithLinks(audioTrans)}</div></details>` : ""}
                                    ${
                                      p.docentes_tic
                                        ? `
                                        <div class="pt-2">
                                            <h3 class="font-black text-xs text-slate-600 uppercase tracking-wider mb-2">Docentes TIC de Apoyo:</h3>
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                ${p.docentes_tic
                                                  .map((doc) => {
                                                    const fotoFix =
                                                      this.fixImgPath(doc.foto);
                                                    return `
                                                        <a href="${doc.contacto}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 transition-all touch-target">
                                                            ${fotoFix ? `<img src="${fotoFix}" alt="${doc.nombre}" class="w-10 h-10 rounded-full object-cover">` : '<span class="text-2xl">👨‍🏫</span>'}
                                                            <div>
                                                                <span class="block font-black text-sm text-slate-900">${doc.nombre}</span>
                                                                <span class="text-xs text-emerald-700 font-bold">Contactar por WhatsApp →</span>
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
                                </article>
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
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm touch-target">
                ← Volver a Guías
            </a>

            <div class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <header class="flex items-center gap-3">
                    ${this.fixImgPath(fo.imagen_icono) ? `<img src="${this.fixImgPath(fo.imagen_icono)}" alt="" class="w-10 h-10">` : '<span class="text-3xl">💬</span>'}
                    <h1 class="text-2xl sm:text-3xl font-black text-orange-700">${fo.titulo}</h1>
                </header>
                <p class="text-slate-700 font-semibold text-sm">${this.formatTextWithLinks(fo.atencion)}</p>

                ${(fo.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}

                ${this.progressPanel((fo.pasos || []).length)}

                <div class="space-y-4">
                    ${(fo.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        const capa1 = `<p class="text-sm font-extrabold text-slate-900">Toca/Selecciona: ${p.titulo}</p>`;
                        const capa2 = `
                            <details class="guia-details group rounded-2xl border-2 border-orange-200 bg-white overflow-hidden">
                                <summary class="cursor-pointer px-4 py-3 font-extrabold text-sm text-orange-700 flex items-center justify-between gap-2">
                                    <span>Ver explicación con analogía y solución de errores</span>
                                    <span class="text-lg transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                                </summary>
                                <div class="px-4 pb-4 pt-2 space-y-3">
                                    <p class="text-sm font-medium text-slate-700">${this.formatTextWithLinks(p.descripcion)}</p>
                                    <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                                        <strong>Analogía:</strong> Participar en un foro es como platicar en grupo en el patio del colegio. Escuchas, das tu opinión con respeto y aprendes de otros.
                                    </div>
                                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                                        <strong>Si hay error:</strong> Verifica que escribiste el mensaje completo, revisa que hayas dado clic en "Enviar" y vuelve a intentar. Si no aparece, revisa conexión.
                                    </div>
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-orange-300 max-h-60 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: p.titulo, context: `Foros - Paso ${p.paso}`, desc: "Falta captura para ilustrar este paso del foro.", suggested: "Agrega una captura mostrando la sección/botón indicado." })}
                                </div>
                            </details>
                        `;
                        return `
                                <article class="bg-orange-50/50 p-5 sm:p-6 rounded-2xl border-2 border-orange-200 space-y-3">
                                    <header>
                                        <h2 class="font-black text-base text-orange-950">Paso ${p.paso}: ${p.titulo}</h2>
                                    </header>
                                    ${capa1}
                                    ${capa2}
                                    ${this.stepToggleHTML(p.paso)}
                                </article>
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
            <a href="#/guias" class="inline-flex items-center gap-2 font-black text-indigo-600 hover:underline text-sm touch-target">
                ← Volver a Guías
            </a>

            <div class="bg-white p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] space-y-6">
                <header class="flex items-center gap-3">
                    ${this.fixImgPath(cu.imagen_icono) ? `<img src="${this.fixImgPath(cu.imagen_icono)}" alt="" class="w-10 h-10">` : '<span class="text-3xl">📝</span>'}
                    <h1 class="text-2xl sm:text-3xl font-black text-pink-700">${cu.titulo}</h1>
                </header>
                <p class="text-slate-700 font-semibold text-sm">${this.formatTextWithLinks(cu.atencion)}</p>

                ${(cu.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}

                ${this.progressPanel((cu.pasos || []).length)}

                <div class="space-y-4">
                    ${(cu.pasos || [])
                      .map((p) => {
                        const imgFix = this.fixImgPath(p.imagen_debajo);
                        const capa1 = `<p class="text-sm font-extrabold text-slate-900">Toca/Selecciona: ${p.titulo}</p>`;
                        // Si tiene tipos_cuestionarios, renderizamos una sub-sección
                        const tiposHTML = p.tipos_cuestionarios
                          ? `
                                <div class="mt-4 space-y-4">
                                    <h3 class="font-black text-pink-700 text-sm uppercase tracking-wider">Tipos de preguntas:</h3>
                                    ${p.tipos_cuestionarios
                                      .map(
                                        (t) => `
                                        <div class="bg-white p-4 rounded-xl border-2 border-pink-100 space-y-2">
                                            <h4 class="font-black text-sm text-pink-800">${t.tipo}</h4>
                                            <p class="text-xs text-slate-600 leading-relaxed">${this.formatTextWithLinks(t.descripcion)}</p>
                                            ${t.imagen_tipo ? `<img src="${this.fixImgPath(t.imagen_tipo)}" alt="${t.tipo}" class="rounded-lg border border-pink-200 max-h-48 object-contain my-1">` : this.renderMediaPlaceholder({ type: "captura", title: t.tipo, context: `Cuestionario - Tipo de pregunta`, desc: "Falta captura para mostrar este tipo de pregunta.", suggested: "Agrega una captura del ejemplo de este tipo de pregunta." })}
                                        </div>
                                    `,
                                      )
                                      .join("")}
                                </div>
                            `
                          : "";

                        const capa2 = `
                            <details class="guia-details group rounded-2xl border-2 border-pink-200 bg-white overflow-hidden">
                                <summary class="cursor-pointer px-4 py-3 font-extrabold text-sm text-pink-700 flex items-center justify-between gap-2">
                                    <span>Ver explicación con analogía y solución de errores</span>
                                    <span class="text-lg transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                                </summary>
                                <div class="px-4 pb-4 pt-2 space-y-3">
                                    <p class="text-sm font-medium text-slate-700">${this.formatTextWithLinks(p.descripcion)}</p>
                                    <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                                        <strong>Analogía:</strong> Responder un cuestionario es como repasar lo aprendido antes del examen. Lee con calma, piensa y marca solo la respuesta que corresponde.
                                    </div>
                                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
                                        <strong>Si hay error:</strong> Verifica la pregunta, lee las opciones completas y no te apresures. Si se cierra o falla, revisa conexión e inténtalo de nuevo.
                                    </div>
                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-pink-300 max-h-60 object-contain my-2">` : this.renderMediaPlaceholder({ type: "captura", title: p.titulo, context: `Cuestionarios - Paso ${p.paso}`, desc: "Falta captura para ilustrar este paso.", suggested: "Agrega una captura mostrando el elemento indicado." })}
                                    ${tiposHTML}
                                </div>
                            </details>
                        `;

                        return `
                                <article class="bg-pink-50/50 p-5 sm:p-6 rounded-2xl border-2 border-pink-200 space-y-3">
                                    <header>
                                        <h2 class="font-black text-base text-pink-950">Paso ${p.paso}: ${p.titulo}</h2>
                                    </header>
                                    ${capa1}
                                    ${capa2}
                                    ${this.stepToggleHTML(p.paso)}
                                </article>
                            `;
                      })
                      .join("")}
                </div>
            </div>
        </div>
    `;
  },

  // RUTA DE APRENDIZAJE GUIADA
  async renderRutaAprendizaje() {
    const app = document.getElementById("app");
    const data = await this.fetchJSON("ruta_aprendizaje.json");
    if (!data || !data.lecciones) {
      app.innerHTML = `<div class="p-8 text-center text-rose-600 font-bold">Error al cargar ruta_aprendizaje.json</div>`;
      return;
    }
    let completadas = [];
    try {
      completadas = JSON.parse(localStorage.getItem("muraltic-ruta") || "[]");
    } catch (e) {}
    const first = data.lecciones[0];
    const next = data.lecciones.find((l, idx) => !completadas.includes(l.id) && (idx === 0 || completadas.includes(data.lecciones[idx-1].id)));
    app.innerHTML = `
      <div class="animate-pop max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <a href="#/" class="inline-flex items-center gap-2 font-black text-indigo-700 hover:underline text-sm touch-target">← Volver al inicio</a>
          ${next ? `<a href="${next.ruta}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-sm touch-target">Seguir: ${next.titulo.split('. ')[1] || next.titulo} →</a>` : `<span class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-sm">¡Ruta completada!</span>`}
        </div>
        <div class="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-6 sm:p-9 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a]">
          <h1 class="text-3xl sm:text-5xl font-black mb-2">${data.titulo}</h1>
          <p class="text-indigo-50 font-semibold max-w-2xl">${data.descripcion}</p>
          <div class="mt-3 text-sm font-bold text-indigo-100">Progreso: ${completadas.length} / ${data.lecciones.length} lecciones</div>
        </div>
        <div class="space-y-3">
          ${data.lecciones.map((l, idx) => {
            const done = completadas.includes(l.id);
            const prev = idx === 0 || completadas.includes(data.lecciones[idx-1].id);
            return `
              <article class="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-[0_4px_0_#0f172a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${done ? "bg-emerald-600" : "bg-indigo-700"} text-white font-black flex items-center justify-center">${done ? "✓" : l.id}</div>
                  <div>
                    <div class="font-black text-slate-900">${l.titulo}</div>
                    <div class="text-xs text-slate-600">${l.objetivo} • ${l.tiempo_min} min</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  ${done ? `<span class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-extrabold">Completado</span>` : prev ? `<a href="${l.ruta}" class="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-extrabold">Ir a esta lección →</a>` : `<span class="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 text-xs font-extrabold">Bloqueado</span>`}
                  ${!done && prev ? `<button onclick="App.marcarLeccion(${l.id}); event.stopPropagation();" class="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-extrabold">Marcar completado</button>` : ""}
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </div>
    `;
    this.renderLearnIndex();
  },

  marcarLeccion(id) {
    try {
      const arr = JSON.parse(localStorage.getItem("muraltic-ruta") || "[]");
      if (!arr.includes(id)) arr.push(id);
      localStorage.setItem("muraltic-ruta", JSON.stringify(arr));
    } catch (e) {}
    this.route();
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
                                class="p-6 rounded-2xl bg-slate-50 border-3 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-extrabold text-slate-800 text-center touch-target">
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
                                class="w-full p-4 rounded-2xl bg-slate-50 border-3 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-extrabold text-slate-800 text-left flex justify-between items-center touch-target">
                            <div>
                                <span class="block text-sm font-bold text-slate-900">${op.carrera.toUpperCase()}</span>
                                <span class="text-xs text-slate-500">Grupo: ${op.grupo}</span>
                            </div>
                            <span class="text-emerald-600">→</span>
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
                                class="w-full p-4 border-b border-slate-200 hover:bg-emerald-50 transition-all flex justify-between items-center text-left touch-target">
                            <span class="font-medium text-slate-800">${e.nombres} ${e.apellidos}</span>
                            <span class="text-emerald-700 font-bold text-sm">${info.pantallas[2]?.btn_ver || "Ver"} →</span>
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
                            class="btn-3d px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-[0_6px_0_#065f46] touch-target">
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
            <div class="bg-emerald-700 text-white p-6 sm:p-10 rounded-3xl border-4 border-slate-900 shadow-[0_8px_0_#0f172a] text-center space-y-3">
                <span class="text-4xl">🔑</span>
                <h1 class="text-3xl sm:text-5xl font-black">${info.titulo}</h1>
                <p class="text-emerald-50 font-semibold text-base max-w-xl mx-auto">${this.formatTextWithLinks(info.descripcion_corta)}</p>
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
                                class="text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1 touch-target">
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
