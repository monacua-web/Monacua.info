# G2. Arquitectura y experiencia del contador

Estado: aprobado como módulo de UX · lógica final pendiente de feedback
Fecha: 2026-09-07
Alcance: únicamente `monacua.info`

## Objetivo

Ayudar a una persona o negocio a obtener una cantidad inicial de hielo y solicitar una cotización, dejando claro que el resultado es una estimación y no una promesa de disponibilidad, precio o despacho.

## Flujo propuesto

```text
Inicio
  ↓
Cantidad de personas
  ↓
Tipo de uso
  ↓
Duración, si aplica
  ↓
Enfriamiento adicional, si aplica
  ↓
Presentación recomendada o selección manual
  ↓
Resultado en kg + desglose
  ↓
Solicitud de cotización con configuración precargada
```

## Wireframe de escritorio

```text
+------------------------------------------------------------------+
| Calcula tu pedido                                                |
| Una cantidad inicial para conversar con Monacua                  |
|                                                                  |
| +------------------------------+  +----------------------------+ |
| | ¿Cuántas personas?            |  | Tu estimación              | |
| | [ - ]       80       [ + ]    |  |                            | |
| | personas                      |  | 60 kg                      | |
| |                              |  | 1 bloque de 60 kg          | |
| | Tipo de uso                   |  | Formato recomendado        | |
| | [ Evento o celebración   v ]  |  | Bloque de 60 kg             | |
| |                              |  |                            | |
| | Duración                      |  | [ Cotizar este pedido ]    | |
| | [ 3 a 4 horas            v ]  |  |                            | |
| |                              |  | Resultado orientativo.    | |
| | [ ] Enfriar botellas         |  | Confirmamos disponibilidad | |
| |                              |  | y condiciones por contacto.| |
| | Presentación                 |  |                            | |
| | [ Recomiéndame una       v ]  |  +----------------------------+ |
| +------------------------------+                                  |
+------------------------------------------------------------------+
```

## Wireframe móvil

```text
+------------------------------+
| Calcula tu pedido            |
| Una cantidad inicial         |
|                              |
| ¿Cuántas personas?           |
| [ - ]       80       [ + ]   |
| personas                     |
|                              |
| Tipo de uso                  |
| [ Evento o celebración   v ] |
|                              |
| Duración                     |
| [ 3 a 4 horas            v ] |
|                              |
| [ ] Enfriar botellas        |
|                              |
| Presentación                |
| [ Recomiéndame una       v ] |
|                              |
| [ Actualizar estimación ]    |
|                              |
| Tu estimación               |
| 60 kg                       |
| 1 bloque de 60 kg           |
| [ Cotizar este pedido ]      |
|                              |
| Resultado orientativo       |
+------------------------------+
```

En móvil el resultado aparece inmediatamente después del formulario. Los botones `-` y `+` conservan un área táctil mínima de 44 x 44 px. El campo numérico permanece visible y editable.

## Entradas y reglas

| Entrada | Tipo | Valores base actuales | Decisión requerida |
| --- | --- | --- | --- |
| Personas | Número | 1 a 10.000 | Confirmar rango operativo |
| Tipo de uso | Selector | Evento, restaurante/bar, hogar | Confirmar categorías |
| Duración | Selector | 2, 4, 6 u 8 horas | Confirmar si aplica a todos los usos |
| Enfriamiento | Casilla | Factor adicional actual | Confirmar cuándo debe aumentar el cálculo |
| Presentación | Selector | Recomendada, bolsas, bultos, bloques | Confirmar catálogo final y unidades |

## Fórmula de línea base actual

La implementación existente usa esta fórmula. Se documenta como referencia técnica, no como regla aprobada:

```text
base = personas × factor_de_uso
factor_de_duración = 1                         si duración <= 4
                     1 + ((duración - 4) × 0,08) en los demás casos
factor_de_enfriamiento = 1,25                  si se activa
                           1                   si no se activa

kg_estimados = redondear_hacia_arriba(
  base × factor_de_duración × factor_de_enfriamiento,
  múltiplos de 2,5 kg
)
```

Factores actuales: evento `0,50 kg/persona`, restaurante o bar `0,40 kg/persona`, hogar `0,32 kg/persona`.

## Recomendación de presentación de línea base

Cuando se elige recomendación automática:

| Kilos estimados | Presentación actual sugerida | Unidad usada |
| --- | --- | --- |
| Hasta 10 kg | Bolsa | 2,5 kg |
| Más de 10 y hasta 35 kg | Bulto | 30 kg |
| Más de 35 kg | Bloque | 60 kg |

La cantidad final se redondea hacia arriba al número entero de unidades de la presentación elegida. Esta regla debe aprobarse junto con el catálogo real.

## Casos de prueba de referencia

Los siguientes resultados reproducen la línea base actual y sirven para discutir la fórmula:

| Caso | Personas | Uso | Duración | Enfriamiento | Estimación base | Recomendación actual | Total mostrado |
| --- | ---: | --- | --- | --- | ---: | --- | ---: |
| Reunión pequeña | 6 | Hogar | 2 h | No | 2,5 kg | 1 bolsa | 2,5 kg |
| Evento mediano | 80 | Evento | 4 h | No | 40 kg | 1 bloque | 60 kg |
| Operación recurrente | 30 | Restaurante/bar | 6 h | No | 15 kg | 1 bulto | 30 kg |
| Evento con enfriamiento | 80 | Evento | 4 h | Sí | 50 kg | 1 bloque | 60 kg |
| Presentación manual | 80 | Evento | 4 h | No | 40 kg | Bolsas | 16 bolsas, 40 kg |

## Estados funcionales

- Inicial: valores de ejemplo visibles y resultado marcado como orientativo.
- Edición: el resultado se actualiza al cambiar personas, uso, duración, enfriamiento o presentación.
- Inválido: campo vacío, no numérico o fuera de rango, con mensaje junto al control.
- Corregido: el valor se normaliza al rango permitido y se comunica la corrección.
- Resultado: kilos, unidades, presentación y CTA de cotización.
- Contacto: WhatsApp recibe personas, uso, duración, enfriamiento, presentación y kilos estimados.

## Criterios de aceptación

- El usuario entiende qué debe introducir sin instrucciones externas.
- `-` y `+` cambian la cantidad sin perder el valor escrito.
- El campo manual acepta teclado y valida límites.
- La selección manual de presentación no se reemplaza silenciosamente.
- El resultado comunica que es orientativo.
- No se muestra precio, disponibilidad, cobertura ni tiempo de entrega sin confirmación.
- El enlace de contacto no inventa datos y conserva la configuración elegida.
- El flujo es usable con teclado, lector de pantalla y touch.

## Gate de G2

Antes de pasar al prototipo visual de alta fidelidad se debe aprobar:

- El objetivo exacto del contador.
- Las categorías de uso.
- La fórmula y sus factores.
- El redondeo.
- El catálogo y las unidades reales.
- El texto de estimación y el contenido del contacto.

El módulo de experiencia fue aprobado por el cliente. Las decisiones de negocio y producto que faltan para cerrar este gate se trasladaron a `observaciones.md`.
