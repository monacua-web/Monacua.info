# Monacua.info · Hielos Claritas

Mockup web de Hielos Claritas para presentar sus formatos de hielo, calcular cantidades aproximadas y enviar una solicitud de cotización por WhatsApp.

## Estructura

- `monacua-mockup.html`: estructura y contenido de la página.
- `styles.css`: estilos visuales, responsive, neumorfismo y animaciones.
- `script.js`: menú, calculadora, selector de personas, resultados y enlaces dinámicos de WhatsApp.
- `img/`: fotografías y mockups de los formatos de hielo.

## Ejecutar localmente

El proyecto no requiere compilación ni dependencias externas. Desde esta carpeta puedes iniciar un servidor local:

```bash
python3 -m http.server 4173
```

Después abre:

```text
http://127.0.0.1:4173/monacua-mockup.html
```

## Funcionalidades principales

- Selector horizontal para calcular hielo según el número de personas.
- Ajuste manual de personas, duración, tipo de uso y presentación.
- Recomendación dinámica de bolsas, bultos o bloques.
- Botones de cotización con pedido precargado hacia WhatsApp.
- Navegación responsive para escritorio y móvil.
- Animaciones respetuosas con `prefers-reduced-motion`.

Las imágenes de producto se generaron tomando como referencia el empaque de Hielos Claritas proporcionado para el mockup.
