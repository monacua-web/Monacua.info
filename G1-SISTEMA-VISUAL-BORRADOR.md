# G1. Sistema visual web de Monacua

Estado: aprobado como dirección visual
Fecha: 2026-09-07
Alcance: únicamente `monacua.info`

## Lectura de diseño

Rediseño de un sitio público de marca y producto para Monacua, dirigido a personas y negocios que necesitan hielo, con un lenguaje geométrico, limpio y contemporáneo. La interfaz debe llevar a una solicitud de cotización sin presentar datos comerciales no confirmados como hechos.

## Dirección aprobada de marca

- Marca principal: `Monacua`.
- Lockup visual del H1: `MONACUA | ICE`.
- Hielos Claritas: cliente de Monacua, no marca principal del sitio.
- Símbolo geométrico: marca complementaria para navegación, favicon, separadores o apoyo visual.
- Color de referencia confirmado: `#6868AC`.
- Logo y tipografía corporativos: pendientes de archivo fuente y licencia.

## Diales de diseño

- `DESIGN_VARIANCE: 6`. Composición con asimetría moderada, sin perder claridad comercial.
- `MOTION_INTENSITY: 4`. Transiciones fluidas para jerarquía y feedback, sin scroll hijacking ni movimiento decorativo.
- `VISUAL_DENSITY: 3`. Aire suficiente para que el empaque, el producto y el contador sean protagonistas.

## Fundación técnica

- HTML, CSS y JavaScript nativos, porque el proyecto actual no tiene compilación ni dependencias.
- Tokens semánticos en CSS variables. No usar colores sueltos dentro de componentes.
- Tema inicial claro y consistente. Se reservará una variante oscura de tokens solo si la identidad oficial la requiere.
- No se incorporarán dependencias sin justificar su necesidad y revisar `package.json`.
- Las animaciones usarán únicamente `transform` y `opacity`, con alternativa estática para `prefers-reduced-motion`.

## Tokens de color

El único valor corporativo confirmado por ahora es `#6868AC`. Los demás valores son propuestas de interfaz y deben quedar identificados como derivados hasta recibir la paleta oficial completa.

| Token | Valor | Estado | Uso |
| --- | --- | --- | --- |
| `--brand-primary` | `#6868AC` | Confirmado | Marca, enlaces activos y CTA principal |
| `--brand-primary-strong` | Pendiente | Derivado por contraste | Hover, foco y fondos oscuros |
| `--brand-soft` | Pendiente | Propuesto | Superficies de apoyo y selección |
| `--brand-turquoise` | Pendiente | Referencia de identidad | Acento secundario controlado |
| `--brand-coral` | Pendiente | Referencia de identidad | Detalle secundario controlado |
| `--surface` | Pendiente | Propuesto | Fondo general |
| `--surface-raised` | Pendiente | Propuesto | Paneles y resultado |
| `--text-primary` | Pendiente | Propuesto | Texto principal |
| `--text-secondary` | Pendiente | Propuesto | Texto auxiliar |
| `--border` | Pendiente | Propuesto | Divisiones y campos |
| `--focus` | Pendiente | Propuesto | Foco visible con contraste AA |

Reglas: un solo acento dominante por vista, turquesa y coral solo como apoyo, sin degradados morados genéricos, sin negro o blanco puros como base visual y sin sombras negras sin teñir.

## Tipografía

- El lettering del logo se tratará como marca y no se sustituirá por una fuente aproximada.
- Hasta recibir la fuente corporativa, el prototipo usará una sans geométrica disponible en el sistema: `Avenir Next`, `Avenir`, `Segoe UI`, `system-ui`, sans-serif.
- Títulos: peso alto, interlineado compacto y máximo dos líneas en el hero de escritorio.
- Cuerpo: lectura cómoda, ancho máximo aproximado de 65 caracteres.
- Etiquetas técnicas: uso limitado de una sans monoespaciada, nunca como decoración repetitiva.
- No se usará serif ni una fuente externa sin aprobación de licencia.

## Arquitectura visual

Se conservan los anclajes actuales para no romper navegación ni referencias existentes:

1. Inicio: hero asimétrico, lockup de Monacua, propuesta de valor y CTA principal.
2. Productos: composición asimétrica con presentaciones confirmadas y estado de cada imagen.
3. Calculadora: formulario directo y resultado estimativo visible en paralelo en escritorio.
4. Calidad y despacho: solo afirmaciones confirmadas.
5. Preguntas frecuentes: respuestas breves y verificables.
6. CTA final: una sola intención de contacto, con etiqueta consistente.

El hero será un `Asymmetric Split Hero`: texto alineado a la izquierda y una fotografía o empaque real a la derecha. En móvil se convierte en una sola columna con el CTA inmediatamente después del mensaje principal.

## Componentes y estados

### Navegación

- Header de máximo 80 px en escritorio.
- Logo Monacua como marca principal.
- Una etiqueta única para la acción de cotización.
- Menú móvil accesible, con foco visible y cierre al seleccionar un ancla.

### Botones

- CTA principal sólido con `--brand-primary` y texto de contraste AA.
- CTA secundario con borde y superficie transparente.
- Estado activo táctil con una reducción mínima de escala o desplazamiento.
- No repetir etiquetas distintas para la misma intención de cotizar.

### Productos

- Mostrar únicamente pesos y formatos confirmados.
- Cada imagen llevará alt text factual.
- Las imágenes generadas o de referencia tendrán una marca interna de provisionalidad hasta aprobación, nunca una afirmación de fotografía oficial.
- Evitar una fila de tres tarjetas idénticas. Usar una composición de producto destacado más dos apoyos, según el catálogo final.

### Calculadora

- Campo numérico visible con botones `-` y `+` de mínimo 44 x 44 px.
- Selector de ocasión o uso, duración opcional y necesidad de enfriamiento solo si forman parte de la fórmula aprobada.
- Resultado en kilogramos, desglose por presentación y aviso de estimación.
- Estados inicial, inválido, corregido y resultado.
- `aria-live` limitado al cambio relevante del resultado.

### FAQ y contacto

- Acordeón nativo con `details` cuando sea suficiente.
- Contactos solo después de confirmar el canal oficial.
- No mostrar capacidad, cobertura, tiempos, precios o certificaciones sin fuente aprobada.

## Tratamiento de imágenes

Inventario actual pendiente de aprobación:

- `img/monacua.jpeg`: fotografía de empaque Monacua Ice, estado de origen oficial pendiente.
- `img/monacua-1k.jpeg`: fotografía de empaque Monacua Ice de 1 kg, estado de origen oficial pendiente.
- `img/imagen-de-referencia.jpeg`: fotografía de referencia de Hielos Claritas, no usar como asset definitivo sin confirmación.
- Archivos `hielos-claritas-*` y `bolsa-*`: mockups o renders del estado actual, no presentarlos como fotografía oficial.

La carpeta `imagenes-de-muestra-bolsas-monacua/` queda incorporada como referencia visual aprobada para el estilo de las bolsas. La referencia muestra bolsas transparentes, impresión violeta, símbolo geométrico superior, lockup centrado `HIELO / ICE / MONACUA`, peso destacado y ficha técnica en la zona inferior. La carpeta no se considera autorización automática para publicar esas fotografías.

No se generarán empaques nuevos ni se alterará el texto impreso para cubrir datos faltantes. Si no existe una imagen aprobada, se reservará un espacio claramente identificado para asset pendiente.

## Movimiento

- Entrada del hero: aparición breve para establecer jerarquía.
- Revelado al entrar en viewport para secciones importantes, solo si no oculta información.
- Feedback breve al actualizar el resultado de la calculadora.
- Sin marquee, parallax, cursor personalizado, scroll hijacking o animación infinita sin función.
- `prefers-reduced-motion` devuelve la página a estados estáticos.

## Gate de G1

Este documento debe aprobarse antes de aplicar tokens y componentes a toda la página. La aprobación debe confirmar o corregir:

- Paleta secundaria y valores de contraste.
- Tipografía web provisional o fuente corporativa.
- Tratamiento de logo y símbolo.
- Composición del hero.
- Composición del catálogo.
- Estados y estructura visual del contador.
- Clasificación de assets.
