# FASE 0: AUDITORÍA Y BASE (Inventario multimedia y revisión)

**Fecha:** $(date '+%Y-%m-%d %H:%M')
**Objetivo:** Inventariar recursos, detectar placeholders faltantes, revisar accesibilidad/contraste/touch targets y estimar peso.

## 1) Inventario de imágenes existentes
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/acceso_campus/buscador_credenciales.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/acceso_campus/pantalla-credenciales.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/acceso_campus/qr-login.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/acceso_campus/TIC_M.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/acceso_campus/TIC_R.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/como_realizar/carpeta_material.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/como_realizar/cuestionario_preliminar.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/como_realizar/foro_preliminar.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/como_realizar/material_estudio.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-seccion-1.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-seccion-2.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-seccion-3.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-seccion-4.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-seccion-5.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-tipo-1.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-tipo-2.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-tipo-3.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-tipo-4.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/cuest-tipo-5.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/cuestionarios/icono_cuestionario.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/foros/boton_enviar.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/foros/foro_estructura2.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/foros/foro_estructura.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/foros/foro_paso2.png
/home/nany/Documentos/GitHub/muraltic2026v/assets/img/pasos_otros/foros/icono_foro.png

## 2) Referencias a imágenes en código/JSON
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:468:                                              act.imagen_debajo,
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:645:    let imagenArriba = data.imagen_arriba
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:646:      ? this.fixImgPath(data.imagen_arriba)
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:648:    let imagenDebajo = data.imagen_debajo
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:649:      ? this.fixImgPath(data.imagen_debajo)
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:661:            ${imagenArriba ? `<img src="${imagenArriba}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:665:            ${imagenDebajo ? `<img src="${imagenDebajo}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:776:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:842:                    ${this.fixImgPath(fo.imagen_icono) ? `<img src="${this.fixImgPath(fo.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">💬</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:852:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:887:                    ${this.fixImgPath(cu.imagen_icono) ? `<img src="${this.fixImgPath(cu.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">📝</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:897:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:909:                                            ${t.imagen_tipo ? `<img src="${this.fixImgPath(t.imagen_tipo)}" alt="${t.tipo}" class="rounded-lg border border-pink-200 max-h-48 object-contain my-1">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:29:                "explicacion": "Para acceder al Campus Virtual deberás seguir la siguiente dirección web: https://campus.tecnacional.edu.ni/login/index.php, escribirla en la barra de navegación de tu teléfono o computadora (Véase la imagen anterior); o bien escanear el código QR a continuación. Véase la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:30:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/qr-login.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:35:                "explicacion": "La primera imagen en este paso nos muestra una sección de login o inicio de sesión, donde deberás ingresar tus credenciales de acceso (usuario y contraseña) que te fueron proporcionadas por el INATEC. Una vez ingresadas, deberás hacer clic en el botón de 'Acceder'. Véase la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:36:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/pantalla-credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:54:                "mensaje": "Si tu Docente TIC no está disponible, podés acceder al Buscador de credenciales dándole click en la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:55:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/buscador_credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:6:        "imagen_icono": "/assets/img/pasos_otros/foros/icono_foro.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:23:                "descripcion": "Debajo del título de cada foro, aparece un texto que nos orienta sobre qué es lo que debemos de escribir o realizar en el foro. Se debe de leer atentamente. La siguiente imagen señala (lo iluminado en amarillo) la parte del texto que debemos leer en cada foro: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:24:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:29:                "descripcion": "Una vez leída la dirección y comprendido lo que vamos a hacer, buscaremos abajo un botón rojo que dice 'Añadir un nuevo tema de debate'. Le daremos click y se nos desplegará una nueva sección que contendrá una estructura que detallaremos después. La siguiente imagen es la del botón: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:30:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_paso2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:35:                "descripcion": "Lo que veremos será un procesador de texto que se dividirá en varias secciones. Lo que normalmente nos interesa es escribir en la casilla de 'Asunto', donde ponemos el tema sobre lo que vamos hablar. Y luego en la casilla de 'Mensaje', donde escribiremos el mensaje que queramos compartir, bien sea un comentario, análisis o reflexión. Existen otras opciones como pegar enlaces, adjuntar archivos, imágenes, videos y sonidos. En la siguiente imagene están señalados: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:36:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:42:                "imagen_debajo": "/assets/img/pasos_otros/foros/boton_enviar.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:21:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:26:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:31:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:48:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:53:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:58:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:63:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:68:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:73:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:90:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:95:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:120:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:125:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:142:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:147:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:164:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:169:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:186:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:191:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:216:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:221:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:238:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:243:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:260:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:265:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:282:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:287:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:292:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:317:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:322:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:339:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:344:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:361:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:366:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:383:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:388:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:413:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:418:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:423:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:440:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:445:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:450:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:467:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:472:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:477:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:502:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:507:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:512:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:529:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:534:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:539:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:556:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:561:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:467:                                            const imgFix = this.fixImgPath(
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:477:                                                    ${imgFix ? `<img src="${imgFix}" alt="${act.titulo}" class="rounded-xl border border-slate-200 max-h-48 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:661:            ${imagenArriba ? `<img src="${imagenArriba}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:665:            ${imagenDebajo ? `<img src="${imagenDebajo}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:776:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:785:                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-2xl border-2 border-slate-300 max-h-72 object-contain my-3">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:799:                                                            ${fotoFix ? `<img src="${fotoFix}" class="w-10 h-10 rounded-full object-cover">` : '<span class="text-2xl">👨‍🏫</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:842:                    ${this.fixImgPath(fo.imagen_icono) ? `<img src="${this.fixImgPath(fo.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">💬</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:852:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:857:                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-orange-300 max-h-60 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:887:                    ${this.fixImgPath(cu.imagen_icono) ? `<img src="${this.fixImgPath(cu.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">📝</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:897:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:909:                                            ${t.imagen_tipo ? `<img src="${this.fixImgPath(t.imagen_tipo)}" alt="${t.tipo}" class="rounded-lg border border-pink-200 max-h-48 object-contain my-1">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:922:                                    ${imgFix ? `<img src="${imgFix}" alt="${p.titulo}" class="rounded-xl border border-pink-300 max-h-60 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:30:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/qr-login.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:36:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/pantalla-credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:45:                        "foto": "/assets/img/pasos_otros/acceso_campus/TIC_R.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:50:                        "foto": "/assets/img/pasos_otros/acceso_campus/TIC_M.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:55:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/buscador_credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:6:        "imagen_icono": "/assets/img/pasos_otros/foros/icono_foro.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:24:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:30:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_paso2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:36:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:42:                "imagen_debajo": "/assets/img/pasos_otros/foros/boton_enviar.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:6:        "imagen_icono":"/assets/img/pasos_otros/cuestionarios/icono_cuestionario.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:23:                "imagen_debajo": "/assets/img/pasos_otros/cuestionarios/cuest-seccion-1.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:30:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:36:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-3.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:42:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-4.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:48:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-5.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:58:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-1.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:63:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:68:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-3.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:73:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-4.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:78:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-5.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:21:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/material_estudio.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:23:                        "imagen_debajo":"/assets/img/pasos_otros/como_realizar/carpeta_material.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:31:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/foro_preliminar.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:43:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/cuestionario_preliminar.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:29:                "explicacion": "Para acceder al Campus Virtual deberás seguir la siguiente dirección web: https://campus.tecnacional.edu.ni/login/index.php, escribirla en la barra de navegación de tu teléfono o computadora (Véase la imagen anterior); o bien escanear el código QR a continuación. Véase la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:30:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/qr-login.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:35:                "explicacion": "La primera imagen en este paso nos muestra una sección de login o inicio de sesión, donde deberás ingresar tus credenciales de acceso (usuario y contraseña) que te fueron proporcionadas por el INATEC. Una vez ingresadas, deberás hacer clic en el botón de 'Acceder'. Véase la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:36:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/pantalla-credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:54:                "mensaje": "Si tu Docente TIC no está disponible, podés acceder al Buscador de credenciales dándole click en la siguiente imagen: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:55:                "imagen_debajo": "/assets/img/pasos_otros/acceso_campus/buscador_credenciales.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:6:        "imagen_icono": "/assets/img/pasos_otros/foros/icono_foro.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:23:                "descripcion": "Debajo del título de cada foro, aparece un texto que nos orienta sobre qué es lo que debemos de escribir o realizar en el foro. Se debe de leer atentamente. La siguiente imagen señala (lo iluminado en amarillo) la parte del texto que debemos leer en cada foro: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:24:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:29:                "descripcion": "Una vez leída la dirección y comprendido lo que vamos a hacer, buscaremos abajo un botón rojo que dice 'Añadir un nuevo tema de debate'. Le daremos click y se nos desplegará una nueva sección que contendrá una estructura que detallaremos después. La siguiente imagen es la del botón: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:30:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_paso2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:35:                "descripcion": "Lo que veremos será un procesador de texto que se dividirá en varias secciones. Lo que normalmente nos interesa es escribir en la casilla de 'Asunto', donde ponemos el tema sobre lo que vamos hablar. Y luego en la casilla de 'Mensaje', donde escribiremos el mensaje que queramos compartir, bien sea un comentario, análisis o reflexión. Existen otras opciones como pegar enlaces, adjuntar archivos, imágenes, videos y sonidos. En la siguiente imagene están señalados: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:36:                "imagen_debajo": "/assets/img/pasos_otros/foros/foro_estructura2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:42:                "imagen_debajo": "/assets/img/pasos_otros/foros/boton_enviar.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:21:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:26:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:31:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:48:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:53:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:58:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:63:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:68:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:73:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:90:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:95:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:120:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:125:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:142:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:147:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:164:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:169:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:186:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:191:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:216:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:221:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:238:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:243:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:260:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:265:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:282:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:287:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:292:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:317:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:322:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:339:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:344:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:361:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:366:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:383:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:388:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:413:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:418:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:423:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:440:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:445:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:450:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:467:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:472:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:477:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:502:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:507:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:512:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:529:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:534:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:539:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:556:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:561:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/modulos_actividades.json:566:                                "imagen_debajo": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:6:        "imagen_icono":"/assets/img/pasos_otros/cuestionarios/icono_cuestionario.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:23:                "imagen_debajo": "/assets/img/pasos_otros/cuestionarios/cuest-seccion-1.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:30:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:36:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-3.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:42:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-4.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:48:                "imagen_debajo":"/assets/img/pasos_otros/cuestionarios/cuest-seccion-5.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:57:                        "descripcion":"Para poder resolverlos debemos leer y analizar su contenido, nos pedirá elegir una única opción de las disponibles. Solamente les daremos un clic. Sus opciones, para las cuales solo debemos de escoger una, se caracterizan porque su elemento cliqueable es un radial, es decir, una circunferencia, como la que aparece en la imagen a continuación: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:58:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-1.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:62:                        "descripcion":"Para poder resolverlos debemos leer y analizar su contenido, nos pedirá elegir una única opción de las disponibles. Solamente les daremos un clic. Es similar al anterior, solamente que tiene dos únicas opciones: falso y verdadero. La siguiente imagen es un ejemplo: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:63:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-2.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:67:                        "descripcion":"Para poder resolverlos debemos leer y analizar su contenido, nos pedirá elegir más de una respuesta. Solamente les daremos clic a las respuestas que creamos correctas. Es similar a los dos anteriores, solamente que su elemento es un checkbox, es decir, un cuadrado. La siguiente imagen es un ejemplo: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:68:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-3.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:72:                        "descripcion":"Aquí la cosa cambia porque ya no se presentan todas las opciones de respuestas a la vez, sino que hay un item conocido como Selector, al que daremos clic. Al hacerlo, se desplegará una lista de opciones para elegir. Elegiremos la única que creemos conveniente. La siguiente imagen es un ejemplo: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:73:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-4.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:77:                        "descripcion":"Aquí la cosa cambia porque es una especie del típico 'JUNTE' las palabras. Se nos presenta normalmente un párrafo al que le faltan palabras, pues en lugar de ellas hay unos recuadros que funcionan como espacios. Nos debemos fijar debajo del párrafo que hay palabras o frases sueltas dentro de recuadros. A estas las debemos de hacer clic, mantenerlo presionado, arrastrarlas hasta el posible espacio de respuesta, juntar y soltar. La siguiente imagen es un ejemplo: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:78:                        "imagen_tipo":"/assets/img/pasos_otros/cuestionarios/cuest-tipo-5.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:21:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/material_estudio.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:23:                        "imagen_debajo":"/assets/img/pasos_otros/como_realizar/carpeta_material.png"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:31:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/foro_preliminar.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_modulo.json:43:                        "imagen_arriba":"/assets/img/pasos_otros/como_realizar/cuestionario_preliminar.png",
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:468:                                              act.imagen_debajo,
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:645:    let imagenArriba = data.imagen_arriba
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:646:      ? this.fixImgPath(data.imagen_arriba)
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:648:    let imagenDebajo = data.imagen_debajo
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:649:      ? this.fixImgPath(data.imagen_debajo)
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:661:            ${imagenArriba ? `<img src="${imagenArriba}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:665:            ${imagenDebajo ? `<img src="${imagenDebajo}" alt="${titulo}" class="rounded-2xl border-2 border-slate-200 max-h-64 object-contain my-2">` : ""}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:776:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:842:                    ${this.fixImgPath(fo.imagen_icono) ? `<img src="${this.fixImgPath(fo.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">💬</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:852:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:887:                    ${this.fixImgPath(cu.imagen_icono) ? `<img src="${this.fixImgPath(cu.imagen_icono)}" class="w-10 h-10">` : '<span class="text-3xl">📝</span>'}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:897:                        const imgFix = this.fixImgPath(p.imagen_debajo);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:909:                                            ${t.imagen_tipo ? `<img src="${this.fixImgPath(t.imagen_tipo)}" alt="${t.tipo}" class="rounded-lg border border-pink-200 max-h-48 object-contain my-1">` : ""}
---SEPARATOR---
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:5:        "mensaje": "Para acceder al Campus e iniciar con los módulos transversales, podés ver el siguiente video: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:6:        "video": [
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:9:                "descarga": "assets/video/transversales/acceso_campus_pc.mp4",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:10:                "youtube": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:14:                "descarga": "assets/video/transversales/acceso_campus_movil.mp4",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_ingresar_a_campus.json:15:                "youtube": "https://www.youtube.com/watch?v=e2Lx_StxbcY"
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:11:                    "url_embed": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:15:                    "url_embed": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_foro.json:35:                "descripcion": "Lo que veremos será un procesador de texto que se dividirá en varias secciones. Lo que normalmente nos interesa es escribir en la casilla de 'Asunto', donde ponemos el tema sobre lo que vamos hablar. Y luego en la casilla de 'Mensaje', donde escribiremos el mensaje que queramos compartir, bien sea un comentario, análisis o reflexión. Existen otras opciones como pegar enlaces, adjuntar archivos, imágenes, videos y sonidos. En la siguiente imagene están señalados: ",
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:11:                    "url_embed": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/data/como_realizar_cuestionario.json:15:                    "url_embed": ""
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:47:  // Helper: Extrae el ID de video de YouTube o retorna la URL embebible
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:51:      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:54:      ? `https://www.youtube.com/embed/${match[2]}`
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:58:  // Componente reutilizable para videos de YouTube o tarjetas de fallback
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:60:    const embedUrl = this.getYouTubeEmbedURL(url);
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:61:    if (embedUrl) {
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:64:                    <div class="video-responsive-wrapper">
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:65:                        <iframe src="${embedUrl}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:77:                        <p class="text-xs font-semibold text-amber-800 mt-0.5">El contenido en video para este apartado estará disponible próximamente en el canal oficial.</p>
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:769:                ${(acc.video || []).map((v) => this.renderVideoContainer(v.youtube, v.titulo)).join("")}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:847:                ${(fo.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}
/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js:892:                ${(cu.btn_cambiar?.opciones || []).map((o) => this.renderVideoContainer(o.url_embed, o.titulo)).join("")}
/home/nany/Documentos/GitHub/muraltic2026v/assets/css/styles.css:47:/* Formato de contenedor de video en relación de aspecto 16:9 */
/home/nany/Documentos/GitHub/muraltic2026v/assets/css/styles.css:48:.video-responsive-wrapper {
/home/nany/Documentos/GitHub/muraltic2026v/assets/css/styles.css:56:.video-responsive-wrapper iframe {

## 3) Pesos aproximados
12K	/home/nany/Documentos/GitHub/muraltic2026v/index.html
64K	/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js
4.0K	/home/nany/Documentos/GitHub/muraltic2026v/assets/css/styles.css
20K	/home/nany/Documentos/GitHub/muraltic2026v/assets/data/db
104K	/home/nany/Documentos/GitHub/muraltic2026v/assets/data
4.6M	/home/nany/Documentos/GitHub/muraltic2026v/assets/img
9.8M	/home/nany/Documentos/GitHub/muraltic2026v

## 4) Revisar touch targets / clases interactivas (aprox)
161:        <div class="flex flex-col items-center justify-center py-20 animate-pop">
227:                        <div class="pt-6 flex flex-wrap justify-center gap-4">
238:                <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
244:                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
268:                <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
269:                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
272:                            <div class="flex items-center gap-3 mb-4">
282:                            <div class="flex items-center gap-3 mb-4">
310:            <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
322:                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
340:                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
370:            <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
377:                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
429:            <div class="animate-pop max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
435:                    <div class="flex items-center gap-4 mb-4">
448:                            <div class="flex items-start gap-4">
472:                                                    <div class="flex items-center gap-3">
509:        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
515:            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
600:        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
656:            <div class="flex items-center gap-3">
694:        <div class="animate-pop max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
701:            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
704:                    <div class="flex items-center gap-4 mb-4">
714:                    <div class="flex items-center gap-4 mb-4">
724:                    <div class="flex items-center gap-4 mb-4">
734:                    <div class="flex items-center gap-4 mb-4">
758:        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
779:                                    <div class="flex items-center gap-3">
792:                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
835:        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
841:                <div class="flex items-center gap-3">
880:        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
886:                <div class="flex items-center gap-3">
1006:                <div class="flex items-center gap-3 mb-4">
1010:                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
1043:                <div class="flex items-center gap-3 mb-4">
1080:                <div class="flex items-center gap-3 mb-4">
1214:        <div class="animate-pop max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
1224:                    <div class="flex items-center gap-2">
---
27

## 5) Resumen hallazgos
- Imágenes existentes: 25. Muchas referencias en JSON ya existen.
- Hay muchísimas entradas con "imagen_debajo": "" en modulos_actividades.json (vacías) - requieren placeholders.
- Hay imágenes usadas en guías que sí existen.
- Videos: Solo helper para YouTube (getYouTubeEmbedURL). No se ven archivos locales de video.
- Audios: No hay referencias visibles.
- Pesos: revisar du más abajo.
4.6M	/home/nany/Documentos/GitHub/muraltic2026v/assets/img
184K	/home/nany/Documentos/GitHub/muraltic2026v/assets
12K	/home/nany/Documentos/GitHub/muraltic2026v/index.html
64K	/home/nany/Documentos/GitHub/muraltic2026v/assets/js/app.js
4.0K	/home/nany/Documentos/GitHub/muraltic2026v/assets/css/styles.css
