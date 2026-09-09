# Monacua.info · Hielos Claritas

Entrada oficial local de Hielos Claritas para presentar sus formatos de hielo, calcular cantidades aproximadas y enviar una solicitud de cotización por WhatsApp.

## Estructura

- `index.html`: entrada oficial del sitio.
- `g3-prototipo.css`: estilos visuales, responsive, estados y animaciones cargados por la entrada oficial.
- `g3-prototipo.js`: menú, calculadora, selector de personas, resultados y enlace dinámico de WhatsApp cargados por la entrada oficial.
- `index_prototipo.html`: snapshot histórico de la versión anterior; no es la entrada activa.
- `img/`: fotografías y mockups de los formatos de hielo.

## Ejecutar localmente

El proyecto no requiere compilación ni dependencias externas. Desde esta carpeta puedes iniciar un servidor local:

```bash
python3 -m http.server 4173
```

Después abre:

```text
http://127.0.0.1:4173/index.html
```

## Funcionalidades principales

- Selector horizontal para calcular hielo según el número de personas.
- Ajuste manual de personas, duración, tipo de uso y presentación.
- Recomendación dinámica de bolsas, bultos o bloques.
- Botones de cotización con pedido precargado hacia WhatsApp.
- Navegación responsive para escritorio y móvil.
- Animaciones respetuosas con `prefers-reduced-motion`.

Las imágenes de producto se generaron tomando como referencia el empaque de Hielos Claritas proporcionado para el mockup.
