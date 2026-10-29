# Control de visitantes · Taller 06

Taller 06 de COM30 (Programación con Frameworks para Web), escenario E5.

La app registra las visitas que llegan a una sede. La persona de recepción anota quién es el visitante, su documento, a quién viene a ver, el motivo, la fecha y las horas de ingreso y salida, junto con la lista de acompañantes. Las visitas quedan en un listado donde se marca el ingreso, se registra la salida o se eliminan.

## Qué tiene

- Formulario reactivo con FormBuilder (nonNullable) y 8 controles.
- Validadores integrados: `required`, `minLength` y `maxLength`.
- Validadores propios: `soloDigitos` para los documentos y `sinSoloEspacios` para los nombres.
- Validador de grupo `salidaPosterior`: la hora de salida tiene que ser posterior a la de ingreso.
- FormArray de acompañantes (nombre y documento), con el validador `minimoFilas(1)`.
- Servicio `VisitaService` con una signal privada, `asReadonly()` y cambios con `update()`.
- Listado con `@for`, `track` y `@empty`, y un panel de resumen que carga con `@defer (on interaction)`.

## Estructura

```
src/app/
  models/visita.ts               interfaces Visita y Acompanante
  validators/validadores.ts      validadores propios, de grupo y mínimo de filas
  services/visita.service.ts     estado de las visitas
  visita-form/                   formulario y lista de acompañantes
  visita-lista/                  listado y cambio de estado
  resumen-visitas/               panel de resumen (se carga con @defer)
  app.ts                         une el formulario y el listado
```

## Cómo ejecutarlo

Se necesita Node.js 20 o superior.

```bash
npm install
npx ng serve
```

Luego se abre http://localhost:4200 en el navegador.

Para generar la versión de producción:

```bash
npx ng build
```

Los datos viven en memoria, así que al recargar la página la lista vuelve a quedar vacía.
