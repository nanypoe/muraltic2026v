# Especificación Técnica y Directrices de Rediseño
**Proyecto:** Sitio de Ayuda y Capacitación para el Uso de Campus Virtual (MOOC)  
**Objetivo:** Guía de desarrollo y rediseño para Agentes de IA e Ingenieros de Software.

---

## 1. Contexto, Perfil de Usuario y Restricciones del Entorno

### 1.1 Perfil de Usuario Final (User Persona)
* **Alfabetización Digital:** Baja o nula en plataformas web convencionales. Dominio limitado a interfaces de consumo pasivo y mensajería (TikTok, Facebook Reels, WhatsApp).
* **Modelos Mentales Desconocidos:** No reconocen patrones estándar como menús de hamburguesa, iconos de perfil, estructuras de archivos/carpetas o términos como "sincrónico", "plataforma", "descargar".
* **Atención y Cognición:** Propensión a la frustración rápida por sobrecarga cognitiva o texto denso. Aprendizaje a ritmo lento que requiere andamiaje (*scaffolding*) y refuerzo visual constante.

### 1.2 Entorno Técnico y De Hardware
* **Dispositivos:** Teléfonos inteligentes Android de gama baja/media-baja, compartidos frecuentemente por varios miembros de la familia.
* **Conectividad:** Zonas rurales o urbano-marginales con conexiones inestables (2G/3G/4G intermitente) o planes de datos prepago limitados.
* **Condiciones Ambientales:** Uso en exteriores con luz solar directa, requiriendo un contraste visual óptimo.

---

## 2. Presupuesto de Rendimiento e Infraestructura Técnica (Performance Budget)

Cualquier modificación o refactorización del código debe cumplir con los siguientes límites de rendimiento:

### 2.1 Métricas Core Web Vitals (Objetivo)
* **First Contentful Paint (FCP):** $< 1.2\text{ s}$
* **Largest Contentful Paint (LCP):** $< 2.0\text{ s}$
* **Cumulative Layout Shift (CLS):** $0.00$
* **Interaction to Next Paint (INP):** $< 100\text{ ms}$
* **Peso Total de Carga Inicial:** $< 350\text{ KB}$ (compreso en Gzip/Brotli).

### 2.2 Estrategia Offline y PWA (Progressive Web App)
* **Service Worker:** Implementar estrategia *Cache-First* para assets estáticos (HTML, CSS, JS, iconos) y *Stale-While-Revalidate* para contenidos multimedia.
* **Web App Manifest:** Configurar `manifest.json` completo con `display: "standalone"`, colores de tema definidos e iconos adaptativos para permitir instalación en pantalla de inicio.
* **Persistencia de Datos:** El usuario debe poder navegar y leer todas las guías de ayuda sin conexión activa a internet.

### 2.3 Optimización de Assets y Multimedia
* **Imágenes:** Formatos obligatorios `AVIF` o `WebP` con `loading="lazy"` y atributos explícitos de `width` y `height` para evitar Layout Shifts.
* **Prohibición de Video Streaming HD:** Sustituir videos pesados por:
  1. Secuencias de animación CSS ultra ligeras.
  2. GIFs optimizados o secuencias de imágenes estáticas en formato tira de cómic.
  3. Si se incluye video: Resolución máxima `360p`, códec H.264/AV1, tasa de bits extremadamente baja y opción de descarga directa en formato MP4 ligero para reproducción local.
* **Tipografías:** Usar *System Font Stacks* (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) para eliminar peticiones HTTP de fuentes web externas (como Google Fonts).
* **JavaScript & CSS:** Vanilla JS/CSS puro o librerías de utilidad ligera (sin frameworks pesados de cliente si no son estrictamente requeridos). Cero dependencias pesadas de terceros.

---

## 3. Arquitectura de la Información y Estrategia Instruccional

### 3.1 Dualidad Textual en Dos Capas (Patrón de Acordeón Accessible)
Cada lección o procedimiento dentro del sitio debe dividirse estrictamente en dos niveles de profundidad:

```
[ Capa 1: Microaprendizaje Directo ] -> Siempre visible
    └── [ Capa 2: Guía Paso a Paso y Analogía ] -> Oculto en <details>/<summary>
```

#### Capa 1: Texto Breve y Directo (Consiso)
* **Regla:** Máximo 10 palabras por instrucción.
* **Sintaxis:** Verbos en imperativo directo al inicio de la oración ("Toca", "Escribe", "Mira").
* **Ejemplo:** `1. Toca el botón azul que dice "Entrar".`

#### Capa 2: Despliegue Pedagógico Detallado (Acordeón)
* **Uso del Elemento HTML Semántico:** `<details>` y `<summary>` estilizados y accesibles por teclado.
* **Contenido:** Explicación minuciosa paso a paso, solución a posibles errores del usuario y uso obligatorio de **Analogías del Mundo Real**.
* **Matriz de Analogías Estándar:**
  * *Campus Virtual* $\rightarrow$ "Tu escuela física".
  * *Módulo/Curso* $\rightarrow$ "El aula de clase".
  * *Subir Tarea* $\rightarrow$ "Entregar una hoja de papel al maestro".
  * *Foro de Discusión* $\rightarrow$ "Platicar en grupo en el patio del colegio".
  * *Perfil de Usuario* $\rightarrow$ "Tu carnet o carné de estudiante".

---

## 4. Patrones de Diseño UI/UX y Accesibilidad (WCAG 2.1 AA/AAA)

### 4.1 Accesibilidad y Usabilidad Táctil
* **Metas de Toque (Touch Targets):** Mínimo de $48 \times 48\text{px}$ (WCAG 2.5.5) con espaciado (*padding*) suficiente entre elementos interactivos para evitar toques accidentales.
* **Contraste de Color:**
  * Texto normal: Contraste mínimo de $4.5:1$ (WCAG AA).
  * Componentes de interfaz y texto grande: Contraste de $7:1$ (WCAG AAA) para garantizar lectura bajo luz solar intensa.
* **Tamaño Tipográfico:** Base mínima de $18\text{px}$ para cuerpo de texto en pantallas móviles, con interlineado de mínimo $1.5$.

### 4.2 Estrategia de Navegación "Espejo" y Mimetismo de Consumo
* **Navegación Inferior (Bottom Navigation):** Sustituir el menú superior o de hamburguesa en móvil por una barra fija inferior (Bottom Bar) similar a WhatsApp o TikTok con un máximo de 3-4 opciones clave con texto + icono.
* **Capturas de Pantalla en Paralelo:**
  * Al explicar un proceso, mostrar siempre la vista del teléfono inteligente junto a la vista de computadora cuando aplique.
  * **Señalización Hiperbólica:** Las capturas deben incluir elementos de superposición visual explícitos (flechas rojas/amarillas de alto grosor, círculos pulsantes sobre los botones clave).

### 4.3 Glosario Visual de Iconografía Universal
Se debe incluir una barra o sección persistente de referencia rápida que traduzca el significado de los iconos estándar del MOOC:
* ⚙️ **Engranaje:** Configuración / Ajustes.
* 🔔 **Campana:** Avisos y Notificaciones importantes.
* 📎 **Clip:** Adjuntar / Subir un archivo de tarea.
* 🔍 **Lupa:** Buscar algo en el curso.
* 👤 **Silueta:** Tu cuenta / Tu perfil.

---

## 5. Gamificación Ligera y Mitigación de Errores

### 5.1 Feedback Inmediato
* **Microinteracciones:** Uso de animaciones CSS ligeras (transformaciones `scale` / `translate` con aceleración por hardware) para dar feedback visual al presionar botones.
* **Barra de Progreso Persistente:** Muestra el avance del usuario en las guías de ayuda (ej. *"Has aprendido 3 de 5 pasos"*).
* **Recompensas Visuales:** Feedback positivo (como animaciones CSS de confeti o insignias digitales simples) al completar un módulo de ayuda.

### 5.2 Diseño Defensivo
* **Confirmación de Acciones Destructivas:** Ante acciones que simulen borrado o envío, presentar modales de confirmación claros con lenguaje sencillo.
* **Simuladores Interactivos (Sandbox):** Componentes interactivos donde el usuario pueda "practicar" hacer clic en elementos simulados del MOOC antes de ir a la plataforma real.

---

## 6. Lista de Verificación (Checklist) para Validación del Agente de IA

Toda propuesta de modificación, código generado o refactorización del sitio debe ser evaluada contra esta lista de verificación:

- [ ] **Semántica HTML:** ¿El código utiliza etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<details>`, `<summary>`, `<footer>`)?
- [ ] **Accesibilidad (ARIA & Keyboard):** ¿Todos los elementos interactivos son navegables por teclado y poseen roles/etiquetas `aria-*` correspondientes?
- [ ] **Rendimiento:** ¿El tamaño total de la página (sin multimedia pesada) es inferior a $350\text{ KB}$?
- [ ] **Metas de Toque:** ¿Los botones y enlaces miden al menos $48 \times 48\text{px}$?
- [ ] **Estructura de Contenido:** ¿Cada lección cumple con el esquema Capa 1 (directo $<10$ palabras) y Capa 2 (acordeón con analogía)?
- [ ] **Sistemas Offline:** ¿Los assets introducidos están registrados en la estrategia de caché del Service Worker?
- [ ] **Sin Tecnologismos:** ¿Se verificó que ningún texto use jerga técnica sin su equivalente conceptual o analogía?
```

eof

---

### Resumen del documento creado:
Este archivo `.md` proporciona las pautas claras y objetivas para un Agente de IA o desarrollador web. Cubre:
1. **Límites de código y rendimiento** (pesos, métricas Core Web Vitals y estrategia offline/PWA).
2. **Pautas de accesibilidad e interfaz** (WCAG 2.1, tamaños de toque de $48 \times 48\text{px}$, contrastes aptos para luz solar).
3. **Estructuración del contenido instruccional** (división en Capa 1 concisa y Capa 2 pedagógica con analogías).
4. **Patrones UX defensivos y adaptados a usuarios novatos** (simuladores, Bottom Nav Bar, capturas señalizadas).
5. **Checklist final de auditoría** para validar cualquier cambio futuro.

¿Te gustaría que trabajemos en la implementación de algún componente en código (como la barra de navegación o la PWA) basándonos en esta especificación?