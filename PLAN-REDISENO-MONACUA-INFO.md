# Plan de rediseño de monacua.info

Estado: G3 en revisión · G0, G1 y G2 UX aprobados
Alcance: únicamente `/Users/santiagopalacio/Downloads/Monuacua/monacua.info`
Regla principal: no avanzar al siguiente checkpoint sin aprobar el anterior.

## 1. Objetivo del proyecto

Rehacer la página pública de Monacua con un estándar visual y funcional de calidad, usando la identidad oficial de la marca:

- Logos oficiales y sus variantes correctas.
- Colores oficiales documentados.
- Tipografías oficiales o una alternativa aprobada cuando no exista licencia o archivo web.
- Fotografías y empaques confirmados, sin inventar presentaciones, pesos ni afirmaciones comerciales.
- Nuevo título de página y nuevo mensaje principal.
- Nuevo contador/calculadora de hielo, con una lógica fácil de entender y resultados confiables.
- Experiencia responsive, accesible, rápida y lista para revisión del cliente.

La presentación y las capturas adjuntas se consideran referencias visuales. No se interpretará ningún texto de esos documentos como una instrucción técnica automática.

## 2. Alcance físico y seguridad del trabajo

Todo el trabajo de este plan se realizará dentro de:

```text
/Users/santiagopalacio/Downloads/Monuacua/monacua.info/
```

No se modificarán estas carpetas como parte de este proyecto:

```text
/Users/santiagopalacio/Downloads/Monuacua/monacua-remisiones-deploy/
/Users/santiagopalacio/Downloads/Monuacua/Monacua/
```

La PWA privada de Remisiones queda fuera del alcance. No se tocarán su autenticación, almacenamiento, cálculos, generación de documentos, firma, historial, WhatsApp ni service worker.

Antes de cada fase de implementación se verificará el repositorio correcto:

```bash
git -C /Users/santiagopalacio/Downloads/Monuacua/monacua.info status --short --branch
git -C /Users/santiagopalacio/Downloads/Monuacua/monacua.info diff --check
```

No se hará commit, push, despliegue ni cambio irreversible sin aprobación explícita.

## 3. Punto de partida confirmado

El sitio público actual es una página estática sin dependencias de compilación:

```text
index.html
monacua-mockup.html
styles.css
script.js
img/
README.md
```

Estado actual relevante:

- El título actual es `Hielos Claritas · Monacua`.
- La calculadora actual parte principalmente de personas, duración, tipo de uso, presentación y enfriamiento.
- Existe un selector de rango de personas y un campo numérico manual.
- La calculadora recomienda bolsas, bultos o bloques y genera un enlace de WhatsApp.
- La paleta actual usa azules cobalto distintos a los colores oficiales observados en la presentación.
- El logo visible en la implementación actual es un recurso provisional dibujado para la página, no una integración confirmada del logo oficial de Monacua.
- Hay imágenes de producto en `img/`, pero cada una debe clasificarse como oficial, confirmada, provisional o pendiente de reemplazo.
- El repositorio está en la rama `main` y contiene algunos archivos no relacionados con el rediseño, como `.DS_Store`; no se borrarán automáticamente.

## 4. Referencias de identidad

Fuente principal revisada:

```text
/Users/santiagopalacio/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/32D48AA1-AAB2-4499-BC79-E0C858682F9D/presentación monacua 2.pdf
```

La presentación contiene 13 láminas en formato 16:9 y muestra, entre otros elementos:

- Color principal explícito: `#6868AC`.
- Color oscuro.
- Color secundario gris.
- Color claro y blanco.
- Variante turquesa.
- Variante de detalle coral/rosada.
- Logo Monacua en versión positiva y negativa.
- Símbolo independiente de la marca.
- Aplicaciones visuales de la identidad en botellas, tapas y fondos.

### Decisión recibida: identidad principal del H1

El H1 visual principal utilizará el lockup:

```text
MONACUA | ICE
```

El símbolo geométrico enviado se conservará como marca complementaria y podrá utilizarse en la navegación, favicon, separadores o elementos de apoyo.

La implementación debe mantener la semántica de encabezado: el H1 tendrá el nombre accesible `Monacua Ice`, aunque visualmente se muestre el lockup oficial. Para producción se solicitará el archivo original del logo en SVG, PDF vectorial, AI, EPS o PNG transparente de alta resolución.

La captura recibida se considera referencia aprobada de composición y texto, pero no se usará como recorte final si existe un archivo fuente de mejor calidad.

Todavía no se considera confirmado el nombre de la tipografía corporativa. El logotipo parece estar tratado como lettering o curvas, por lo que no se debe asumir que esa forma corresponde a una fuente instalable.

### Materiales que se deben confirmar en G0

- Archivo vectorial del logo: SVG, PDF vectorial, AI o EPS.
- Versiones positiva, negativa, monocromática y símbolo independiente.
- Zona de protección y tamaño mínimo del logo.
- Nombre exacto de la fuente corporativa.
- Archivos web de la fuente o permiso de uso.
- Valores HEX, RGB y CMYK de todos los colores, especialmente los secundarios.
- Nombre comercial correcto de la marca y de la línea de hielo.
- Pesos, formatos, cobertura, horarios, precios y promesas que sí pueden publicarse.

Si no existen archivos oficiales, se documentará claramente qué parte es provisional y se pedirá aprobación antes de presentarla como definitiva.

## 5. Lectura de diseño propuesta

Se entiende el proyecto como un rediseño de sitio público para una marca de bebidas/hielo, con una dirección:

- Identidad primero.
- Limpia, geométrica y contemporánea.
- Clara para convertir visitas en solicitudes de cotización.
- Con presencia visual de producto, pero sin saturar la interfaz.
- Con el morado oficial como color protagonista y el turquesa/coral como acentos controlados.
- Con animación sutil y funcional, nunca como sustituto de la información.
- Con una estructura que funcione igual de bien en móvil y escritorio.

La identidad oficial tendrá prioridad sobre cualquier recomendación genérica de diseño.

## 6. Checkpoints y gates de aprobación

### G0 — Alcance, marca y verdad del producto

Estado: aprobado por el cliente el 2026-09-07.

Decisión de marca: `Monacua` es la marca principal del sitio. `Hielos Claritas` es cliente de Monacua y no debe presentarse como la marca principal de la web.

#### Goal

Cerrar las decisiones que pueden cambiar completamente el diseño: marca principal, título, audiencia, productos, datos comerciales y objetivo del contador.

#### Trabajo

- Confirmar si la marca visible será `Monacua`, `Hielos Claritas` o una jerarquía combinada.
- Confirmar el nuevo título de la página y el texto principal del hero.
- Definir si la página vende directamente, recibe solicitudes de cotización o solo presenta la marca.
- Identificar audiencia prioritaria: hogares, eventos, restaurantes, bares, hoteles, empresas u otra.
- Validar formatos y pesos reales disponibles.
- Separar datos confirmados de datos provisionales.
- Definir cobertura geográfica, tiempos de entrega y canales de contacto autorizados.
- Confirmar qué archivos de logo, tipografía y fotografía son oficiales.
- Confirmar qué debe contar exactamente el nuevo contador.

#### Evidencia de salida

Un brief aprobado con:

- Marca y jerarquía.
- Título y mensajes principales.
- Público objetivo.
- Catálogo confirmado.
- Lista de claims permitidos.
- Materiales oficiales disponibles.
- Reglas iniciales del contador.

#### Gate

No se diseña el sistema visual ni se cambia el código hasta aprobar este brief.

#### Cierre de G0

El cliente aprobó el brief de alcance y la jerarquía de marca. Los datos todavía no confirmados —contactos públicos, catálogo definitivo, pesos, cobertura, tipografía y archivos vectoriales— se mantendrán como provisionales o pendientes durante G1 y no se publicarán como hechos sin validación.

---

### G1 — Sistema de identidad web

Estado: aprobado como dirección visual. Documento: `G1-SISTEMA-VISUAL-BORRADOR.md`.

#### Goal

Convertir la identidad oficial en un sistema aplicable a una interfaz web.

#### Trabajo

- Preparar logos oficiales optimizados para web.
- Definir cuándo usar logo completo, símbolo, versión oscura, versión clara y monocromática.
- Crear tokens de color con nombres semánticos, no colores sueltos dentro de los componentes.
- Usar `#6868AC` como referencia principal mientras se confirman los demás valores.
- Definir fondos, texto principal, texto secundario, bordes, estados, CTA y focos de teclado.
- Seleccionar la tipografía oficial para títulos, cuerpo, números y etiquetas.
- Definir fallback web si la fuente oficial no está disponible.
- Definir escala de tamaños, pesos, interlineado, radios, sombras, espaciado y ancho máximo.
- Definir familia única de iconos; no usar emojis como iconos de interfaz.
- Definir reglas para fotografías: recorte, fondo, escala, sombra, transparencia y etiqueta de provisionalidad.

#### Evidencia de salida

Una hoja de sistema visual con:

- Paleta.
- Tipografía.
- Logos.
- Botones.
- Campos.
- Tarjetas.
- Estados de interacción.
- Ejemplo de cabecera y resultado de calculadora.

#### Gate

La hoja visual debe ser aprobada antes de aplicarla a toda la página.

---

### G2 — Arquitectura y experiencia del contador

Estado: aprobado como módulo de UX. Borrador: `G2-CALCULADORA-BORRADOR.md`. Las decisiones pendientes están consolidadas en `observaciones.md`.

#### Goal

Diseñar una experiencia que permita pedir hielo sin confusión y sin dar una falsa sensación de exactitud.

#### Arquitectura propuesta

1. Hero: qué ofrece Monacua y cuál es la acción principal.
2. Necesidad del cliente: para qué ocasión o tipo de operación necesita hielo.
3. Formatos: presentación, peso, uso recomendado y disponibilidad confirmada.
4. Contador/calculadora: datos mínimos y recomendación.
5. Calidad y despacho: información de confianza.
6. Preguntas frecuentes.
7. CTA final para cotizar o contactar.

#### Propuesta base del nuevo contador

La propuesta inicial es reemplazar el protagonismo del slider por un control más directo:

- Campo numérico visible.
- Botones `−` y `+` con áreas táctiles cómodas.
- Selector de ocasión o tipo de uso.
- Duración opcional.
- Opción de enfriar bebidas o conservar producto.
- Selector de presentación o recomendación automática.
- Resultado en kilogramos.
- Desglose de bolsas, bultos o bloques.
- Texto aclaratorio: resultado orientativo sujeto a confirmación.
- CTA con la configuración completa precargada en WhatsApp.

La propuesta se ajustará si el cliente quiere que el contador mida otra cosa, por ejemplo unidades de bolsas, cantidad de bultos, kilos totales o consumo por evento.

#### Casos que deben definirse

- Pedido pequeño.
- Evento mediano.
- Evento grande.
- Restaurante/bar con consumo recurrente.
- Uso con enfriamiento de botellas.
- Presentación elegida manualmente.
- Presentación recomendada automáticamente.
- Valores fuera de rango.
- Campos vacíos o inválidos.
- Cambio rápido de datos en móvil.

#### Evidencia de salida

- Wireframe o prototipo de escritorio.
- Wireframe o prototipo móvil.
- Diagrama simple del flujo.
- Tabla con entradas, fórmula, redondeo y resultado esperado.

#### Gate

Se aprueban estructura, comportamiento y fórmula antes de construir la versión visual final.

---

### G3 — Prototipo visual de alta fidelidad

Estado: en revisión. El prototipo G3 usa ahora la entrada principal `index.html`, con `g3-prototipo.css` y `g3-prototipo.js`. Asset editorial provisional: `img/prototipo-hielo-editorial.png`.

#### Goal

Construir una versión visual completa con la identidad aprobada, todavía separada de la lógica final cuando sea necesario.

#### Trabajo

- Rediseñar la cabecera y navegación.
- Definir un hero con el nuevo título.
- Integrar el logo oficial correctamente.
- Mostrar productos confirmados con sus pesos reales.
- Diseñar el nuevo contador con sus estados principales.
- Diseñar resultados, CTA, FAQ y pie de página.
- Preparar versión desktop y móvil.
- Mantener jerarquía clara y lectura completa sin depender de animaciones.
- Revisar que los colores oficiales tengan contraste suficiente.
- Sustituir símbolos improvisados por iconos consistentes.

#### Evidencia de salida

- Captura de escritorio grande.
- Captura de escritorio mediano.
- Captura móvil.
- Vista del estado inicial del contador.
- Vista del resultado.
- Vista de error o dato incompleto.
- Comparación contra la presentación y las capturas de referencia.

#### Gate

No se implementa la lógica definitiva ni se publica el prototipo hasta que el cliente apruebe la dirección visual.

---

### G4 — Implementación controlada en monacua.info

#### Goal

Aplicar el prototipo aprobado en el sitio público, manteniendo el alcance dentro de `monacua.info`.

#### Archivos previstos

- `index.html`: estructura, contenido, metadatos, título y accesibilidad.
- `styles.css`: tokens, layout, responsive, estados y animación.
- `script.js`: contador, validaciones, resultado y enlaces de contacto.
- `img/`: únicamente assets confirmados o identificados como provisionales.
- `README.md`: instrucciones actualizadas si cambia la forma de ejecutar o validar el sitio.

#### Trabajo técnico

- Actualizar `<title>`, descripción, color de tema, favicon y metadatos sociales.
- Mantener `index.html` como entrada principal para el despliegue.
- Implementar la fórmula aprobada en G2.
- Mantener enlaces de WhatsApp y correo solo con datos confirmados.
- Agregar estados de carga, vacío, error y resultado cuando apliquen.
- Mantener navegación por teclado, foco visible y labels reales.
- Añadir `aria-live` al resultado sin producir anuncios excesivos.
- Usar `prefers-reduced-motion`.
- Optimizar imágenes y reservar espacio para evitar saltos de layout.
- No incorporar dependencias nuevas sin justificar su necesidad y verificar el paquete.

#### Gate

La implementación pasa a QA solo cuando el código está completo, el diff es limpio y los casos de la calculadora coinciden con la tabla aprobada.

---

### G5 — QA visual, funcional y accesible

#### Goal

Demostrar que la página funciona y se ve correctamente antes de cualquier publicación.

#### Matriz visual mínima

- 375 px: móvil pequeño.
- 768 px: tablet.
- 1024 px: escritorio compacto.
- 1440 px: escritorio amplio.

#### Revisión visual

- Logo nítido y correctamente contrastado.
- No hay deformación de empaques ni fotografías.
- Títulos sin cortes extraños.
- Botones sin texto partido.
- No existe scroll horizontal.
- El contador es cómodo en touch.
- El resultado se entiende sin leer instrucciones externas.
- El CTA principal destaca sin romper la paleta.
- No hay elementos superpuestos.
- Las animaciones no ocultan contenido importante.

#### Revisión funcional

- El contador cambia correctamente con `−`, `+` y campo manual.
- Los cambios se reflejan en el resultado.
- La recomendación cambia según la regla aprobada.
- La selección manual de formato se respeta.
- El redondeo coincide con la tabla de casos.
- Los valores inválidos muestran una ayuda clara.
- El enlace de WhatsApp contiene la configuración correcta.
- Navegación, FAQ y enlaces internos funcionan.

#### Revisión accesible

- Contraste mínimo de 4.5:1 para texto normal.
- Navegación completa con teclado.
- Foco visible en controles.
- Labels asociados a todos los campos.
- Texto alternativo correcto para imágenes informativas.
- Imágenes decorativas ocultas para lectores de pantalla.
- Estados comunicados cerca del control correspondiente.
- Animación reducida cuando el usuario lo solicita.
- Objetivos táctiles de al menos 44 x 44 px.

#### Revisión técnica

```bash
node --check /Users/santiagopalacio/Downloads/Monuacua/monacua.info/g3-prototipo.js
git -C /Users/santiagopalacio/Downloads/Monuacua/monacua.info diff --check
```

La validación visual se hará sirviendo el sitio por HTTP, no abriendo los HTML directamente con `file://`:

```bash
cd /Users/santiagopalacio/Downloads/Monuacua/monacua.info
python3 -m http.server 4173 --bind 127.0.0.1
```

#### Gate

No se considera terminado con solo una captura o una compilación. Deben pasar por separado la revisión visual, funcional, accesible y técnica.

---

### G6 — Entrega y publicación

#### Goal

Entregar una versión trazable, revisada y aprobada.

#### Trabajo

- Revisar el diff final únicamente dentro de `monacua.info`.
- Confirmar que no se incluyeron secretos ni archivos ajenos.
- Confirmar que los assets provisionales están identificados.
- Crear commit solo después de aprobación explícita.
- Generar preview o despliegue solo con autorización.
- Verificar la URL publicada y los recursos cargados.
- Guardar evidencia de la versión aprobada.
- Documentar cualquier pendiente no bloqueante.

#### Gate final

La entrega se considera aprobada cuando:

- El cliente aprueba la apariencia.
- La identidad oficial está correctamente aplicada.
- El título nuevo está confirmado.
- El contador cumple la fórmula aprobada.
- No hay errores críticos de responsive, accesibilidad o interacción.
- El despliegue, si se autoriza, responde correctamente.

## 7. Reglas de contenido y confianza

- No afirmar certificaciones, capacidad, disponibilidad, cobertura o tiempos sin confirmación.
- No inventar pesos, formatos ni características del producto.
- No presentar imágenes generadas o de referencia como fotografías oficiales.
- No cambiar el número de WhatsApp o correo sin confirmación.
- El resultado del contador debe llamarse estimación si no representa una cotización final.
- Si un dato falta, se mostrará como pendiente o se omitirá; no se rellenará con una suposición.

## 8. Entregables esperados

Al finalizar el proceso deben existir:

1. Brief de marca y producto aprobado.
2. Sistema visual web aprobado.
3. Flujo y fórmula del contador aprobados.
4. Prototipo desktop/mobile aprobado.
5. Implementación funcional en `monacua.info`.
6. Evidencia de QA visual, funcional, accesible y técnica.
7. Commit o publicación, únicamente si fueron autorizados.

## 9. Registro de decisiones

| Decisión | Estado | Responsable | Evidencia |
|---|---|---|---|
| Marca principal visible | `Monacua`; lockup visual `MONACUA | ICE` | Cliente | Confirmación de que Hielos Claritas es cliente de Monacua |
| Relación con Hielos Claritas | Cliente de Monacua | Cliente | Decisión G0 aprobada |
| Nuevo título de página | Pendiente de G0 | Cliente | Brief aprobado |
| H1 visual | `MONACUA | ICE` | Cliente | Lockup enviado |
| Símbolo complementario | Símbolo geométrico Monacua | Cliente | Recurso enviado |
| Objetivo del contador | Pendiente de G0/G2 | Cliente | Flujo aprobado |
| Fórmula y redondeo | Pendiente de G2 | Cliente + implementación | Tabla de casos |
| Logo vectorial oficial | Pendiente de G0 | Cliente | Asset entregado |
| Tipografía oficial | Pendiente de G0 | Cliente | Nombre/licencia/archivo |
| Paleta completa | Parcial: principal `#6868AC` | Cliente + diseño | Sistema visual |
| Fotografías oficiales | Pendiente de inventario | Cliente | Catálogo de assets |
| Publicación | No autorizada todavía | Cliente | Aprobación final |

## 10. Condición de avance

Cada fase debe cerrarse con esta secuencia:

```text
Trabajo de la fase
        ↓
Evidencia verificable
        ↓
Revisión del cliente
        ↓
Aprobación explícita
        ↓
Inicio de la siguiente fase
```

Si una fase no está aprobada, se corrige esa fase. No se saltará directamente a código, publicación o cambios en otra carpeta.
