# ¿Juego o crimen encubierto? · Demo de la primera sesión

Abre `index.html` en el navegador. El menú superior permite pasar por las tres capas de la misma crónica. Las páginas, la hoja de estilos, el script y las ilustraciones viajan juntos en esta carpeta. La versión publicada termina en la sección 04, «Dos futuros para la isla». Las secciones 05 (protección) y 06 (equilibrio) están reservadas y ocultas en las tres etapas; se conservan completas para reactivarlas cuando lo solicite el docente. El interruptor fijo «Brandbook activo / desactivado» permite comparar el diseño de marca con una versión neutra en cualquier parte de la página.

## Primera sesión: 60 minutos

Introducción con demostración del docente y preguntas orales. La construcción por parte de los estudiantes queda para la segunda sesión. El objetivo de hoy es distinguir las decisiones periodísticas y creativas de la implementación con IA, reconocer las funciones de HTML, CSS y JavaScript y saber comprobar una web contra su intención y sus datos.

Presentación: [Clase Vibe Coding](https://docs.google.com/presentation/d/1pvD3DwIx75Khubly_Qh5GrzR9okqqBu4HaJJCyUcrmI/edit). Las notas de cada diapositiva contienen el tiempo, las acciones de la demo y las preguntas para el grupo.

| Minutos | Diapositivas | Recorrido | Comprobación oral o visible |
| --- | --- | --- | --- |
| 00–05 | 1 | Presentar el objetivo y mostrar brevemente la web final. | Identificar el efecto narrativo de acumular cuerpos. |
| 05–11 | 2–4 | Pregunta periodística, evidencia, responsabilidad del autor y referencias concretas del proyecto. | Una decisión editorial que existe antes del código. |
| 11–20 | 5–7 | Contexto para la IA, boceto del autor y encargo verificable. | Traducir la intención a la prueba 25 aves / 100 chanchos. |
| 20–23 | 8 | Distinguir HTML, CSS y JavaScript. | Asociar orden, apariencia y recuento con sus capas. |
| 23–29 | 9 | Mostrar HTML sin estilos ni JavaScript. | La historia mantiene un orden y una tabla identificable. |
| 29–37 | 10–11 | Aplicar el brandbook y alternar su interruptor. | Cambia la presentación, se conservan texto y cifras. |
| 37–44 | 12 | Mostrar scroll y acumulación. | Verificar 1/4, 25/100 y 50/200; subir para comprobar la reversión. |
| 44–47 | 13 | Examinar el dramatismo de los dos futuros. | Relacionar la forma de la curva con la conclusión y su evidencia. |
| 47–53 | 14–15 | Iterar con criterios y revisar la web. | Un cambio de tamaño o ritmo conserva los datos. |
| 53–55 | 16 | Distinguir archivos, servidor local y alojamiento. | Una URL local no equivale a una web publicada. |
| 55–60 | 17–18 | Preguntas de cierre y preparación para el workshop. | Explicar quién decide, qué ejecuta la IA y cómo se verifica. |

### Preparación del docente

- Abrir [HTML](https://rexssaurus.github.io/com208-angry-birds/01-html.html), [CSS](https://rexssaurus.github.io/com208-angry-birds/02-css.html) y [JavaScript](https://rexssaurus.github.io/com208-angry-birds/index.html) antes de la clase. Los estudiantes pueden abrir estos enlaces públicos desde sus propios equipos.
- Tener disponibles el boceto del autor y el brandbook, con las páginas 14, 28 y 61–64 localizadas.
- Abrir `01-html.html`, `styles.css` y `script.js` en el editor. Mostrar fragmentos concretos, sin leer todo el código.
- Usar las tres versiones preparadas como demostración principal. Si se hace un cambio en vivo con IA, guardar antes una copia y acotarlo a una intención. Las versiones preparadas permiten retomar el recorrido si la generación demora o falla.
- Conservar la pregunta de evidencia de la diapositiva 13 y el cierre, aunque se acorte la lectura de código. La sesión no requiere instalar herramientas ni crear cuentas.

La demo se publica en GitHub Pages: [Angry Birds Times](https://rexssaurus.github.io/com208-angry-birds/). El equipo debe justificar sus afirmaciones con datos y fuentes.

## Detalle de la demostración

1. **Adelanto (3 min).** Muestra la portada y baja despacio. La pregunta y las dos pilas se quedan en pantalla durante cincuenta lanzamientos. Después aparecen la reflexión inicial, el origen y los dos futuros de la isla. Cierra en los dos futuros de la sección 04.
2. **HTML (6 min).** Entra a «01 HTML». Señala el orden del relato, los personajes y las cifras. Muestra en el editor la tabla oculta con los 51 estados del recuento: desde 0 aves y 0 chanchos hasta 50 aves y 200 chanchos. El contenido se entiende sin estilos ni animación. Las curvas conservan su desenlace estático.
3. **CSS (8 min).** Entra a «02 CSS». Abre el brandbook en la p. 14 para la paleta, la p. 28 para el Tema 4 y las pp. 61–64 para la jerarquía tipográfica. La portada ocurre en el paisaje y las dos curvas caen desde el cielo hasta el suelo. Los personajes, el contorno de las letras y las trayectorias comparten la escena, sin tarjetas ni un velo blanco sobre el fondo. La demo adapta la tipografía con Marker Felt e Impact para titulares y Trebuchet MS para lectura. Usa el interruptor «Brandbook activo / desactivado» para comparar tipografías, colores, paisajes y personajes, conservando el texto y los datos. El control funciona con CSS, sin JavaScript: el estado de un checkbox selecciona el conjunto de estilos mediante `:has()`. Muestra `<link rel="stylesheet" href="styles.css">` y los estilos de las pilas.
4. **JavaScript (7 min).** Entra a «03 JavaScript» y señala `<script src="script.js" defer></script>`. Baja desde cero hasta cincuenta aves. El recorrido es aproximadamente tres veces más corto: el mismo movimiento de scroll revela más figuras, manteniendo cuatro chanchos por ave. Cada paso agrega un ave a la izquierda y cuatro chanchos a la derecha. Al final quedan 50 y 200. El código mide el avance del scroll, selecciona una fila y actualiza los totales y las figuras. El CSS organiza posiciones, giros y rebotes de Red y los chanchos «Damaged 2» del brandbook. Sube para comprobar que vuelve a la fila anterior. En «Dos futuros», observa cómo se dibuja cada curva y el personaje cae al suelo; el recorrido se repite mientras la escena está visible.
5. **Comprobación oral (3 min).** En el segundo lanzamiento deben verse dos aves y ocho chanchos. Compara esa fila con la anterior y pregunta cuántos chanchos cayeron en ese tiro. Para el cierre, pregunta qué evidencia permitiría evaluar los dos desenlaces y qué sacrifica el diseño al mostrar una idea de forma dramática.

## Encargos breves para una demostración con IA

- **HTML.** «Usa mi texto en este orden: portada, recuento, reflexión inicial, origen y dos futuros. En el recuento prepara un montón de aves a la izquierda y uno de chanchos desprotegidos a la derecha. Usa los 51 estados de mi tabla. Mantén mis cifras y mi redacción».
- **CSS.** «Usa el Tema 4 de mi brandbook como el paisaje de la historia. Coloca los personajes y las curvas directamente en ese mundo. Quita los marcos y las tarjetas. Conserva una lectura clara de qué especie desaparece. Diseña las pilas irregulares y fija el panel solo durante el recorrido del recuento».
- **JavaScript.** «Empieza el recuento en cero. Selecciona una fila de mi tabla según el scroll y muestra exactamente esa cantidad de figuras, tanto al bajar como al subir. En las dos escenas de la sección 04, dibuja la curva y desplaza el personaje hasta el suelo, con una pausa antes de repetir. Respeta la preferencia de movimiento reducido».

## Decisiones editoriales y gráficas

El recuento usa cuatro derribos por ave con chanchos a campo abierto. Las curvas de la sección 04 muestran dos desenlaces: 100 es la población inicial de cada especie y 0 su extinción. Se eliminan la cuadrícula y las graduaciones intermedias para priorizar la idea visual.

La portada y los dos futuros usan el Tema 4 del brandbook (p. 28). Las pilas usan Red «Fly 1» (p. 35) y Minion Pig «Damaged 2» (p. 42), las mismas ilustraciones del resto de la crónica. El ave amarilla «Fly 2» de la sección 04 procede de la p. 36. Los personajes de las pilas se muestran un 50% más grandes, con más separación horizontal y vertical y menos figuras por fila. Se permite una superposición leve; la pila de chanchos dispone de más ancho para conservar las caras visibles. Los recortes de los personajes usan máscaras CSS para integrarlos al paisaje. Los colores son aproximaciones sRGB para pantalla y la tipografía es una adaptación, no una fuente oficial incrustada. En móvil los dos futuros se leen uno después del otro; en escritorio se comparan lado a lado.

La decisión sobre la historia, los supuestos y la prioridad visual es humana. La IA traduce esas decisiones a HTML, CSS y JavaScript. No reemplaza la investigación ni valida la hipótesis.

## Comparación con y sin brandbook

El interruptor aparece en las etapas CSS y JavaScript y comienza activado. Permanece disponible al desplazarse por la crónica. Al desactivarlo se usan tipografías de sistema, una paleta neutra, fondos sencillos y las ilustraciones genéricas de la versión inicial. El contenido, los 200 chanchos y la lógica del scroll son los mismos. En la etapa HTML el control queda oculto porque aún no se carga la hoja de estilos. No se guarda la preferencia entre páginas: cada capa comienza con el brandbook activo.

En «03 JavaScript», activa «Grid view» junto al brandbook. Las guías moradas marcan las filas y columnas de CSS Grid. Al apuntar o tocar una caja, su margen exterior se pinta de naranja y su padding interior de verde. La leyenda muestra las medidas en píxeles. En «El origen», apunta a un hueco entre los personajes para ver el margen de la cuadrícula. En la portada, apunta al bloque del titular para comparar su padding.

## Base de 100 niveles para analizar

`datos/angry_birds_100_niveles_simulados.csv` contiene una fila por nivel, del 1 al 100, con `nivel`, `proteccion`, `pajaros_utilizados` y `bajas_chanchos`. Usa UTF-8 y comas como separador. `datos/ficha_datos.json` documenta las variables y la generación.

La base fue creada el 06-11-2026 con las reglas del docente: cada pájaro produce cuatro bajas sin protección, tres con madera y dos con piedra. Las protecciones alternan entre niveles: 34 sin protección, 33 con madera y 33 con piedra. Los pájaros utilizados varían entre 1 y 10 y se repiten por grupos de tres para facilitar la comparación. Cada nivel cumple exactamente su proporción.

El Excel complementario contiene las 100 filas, las fórmulas de bajas y un resumen por protección. El CSV es una copia fija de los valores iniciales. Para comparar las relaciones se puede usar un gráfico de dispersión con pájaros utilizados en el eje horizontal, bajas en el vertical y una serie por protección. Las pilas con scroll representan la regla sin protección de cuatro bajas por ave. El módulo reservado «¿Y si pudieran protegerse?» permite comparar las tres protecciones cuando se reactive.

## Sección 05 reservada: ¿y si pudieran protegerse?

Está oculta en la versión actual. Al reactivarla, será la sección 05, después de «Dos futuros para la isla»:  [abrir el módulo](https://rexssaurus.github.io/com208-angry-birds/index.html#proteccion). Cada botón comienza un escenario nuevo con una sola ave y cuatro chanchos sanos. Primero vuela el ave; después del impacto, los chanchos cambian a su versión dañada uno a uno y sube el contador. El ave queda en el suelo hasta el siguiente clic. Cambian el material del refugio, los personajes derrotados y los que quedan a salvo. Los clics no acumulan ataques entre escenarios. Pulsar de nuevo la misma opción repite su animación.

| Protección | Aves | Derrotados | A salvo | Bajas por ave |
| --- | ---: | ---: | ---: | ---: |
| Ninguna | 1 | 4 | 0 | 4 |
| Madera | 1 | 3 | 1 | 3 |
| Piedra | 1 | 2 | 2 | 2 |

La comparación usa los niveles 1, 2 y 3 del CSV. Los cuatro chanchos iniciales permiten comparar con el mismo denominador. «A salvo» se calcula restando las bajas a cuatro. La tabla HTML es una copia de esas filas, no se sincroniza al editar el CSV.

Cuando se reactive, dedica dos minutos de la demostración de JavaScript a elegir las tres opciones y preguntar: «¿Qué cambiamos y qué mantuvimos igual?». La comprobación es contar 4, 3 y 2 personajes dañados después del único lanzamiento. Antes del impacto debe haber cero bajas. No sumar bajas de escenarios distintos.

- **HTML:** contiene el titular, los resultados y una tabla consultable en «Ver los datos de esta comparación». Los botones permanecen ocultos hasta cargar la interacción.
- **CSS:** agrega el paisaje, los personajes, la resortera y el refugio; muestra el escenario estático sin protección. El interruptor de brandbook también cambia el diseño de este módulo.
- **JavaScript:** lee una fila de la tabla según el botón, actualiza las cifras y cambia entre personajes normales y dañados. La secuencia separa vuelo, impacto y recuento. Los clics seguidos cancelan el intento anterior y reinician con cuatro chanchos sanos. Los botones funcionan con Tab y Enter o espacio y anuncian el resultado a lectores de pantalla. Con movimiento reducido, el cambio es inmediato y sin animación.

Encargo de ejemplo: «Usa las filas 1, 2 y 3 de mi base. Mantén una sola ave y cuatro chanchos iniciales en los tres escenarios. Al elegir ninguna protección, madera o piedra, anima primero el vuelo y después del impacto muestra 4, 3 o 2 derrotados; los demás deben quedar a salvo. Usa mis personajes del brandbook y permite comprobar los resultados en una tabla. No acumules ataques entre escenarios ni cambies mis proporciones».


## Sección 06 reservada: un equilibrio posible

Está oculta en la versión actual. Después del módulo se plantea la posibilidad de mantener estables ambas poblaciones mediante una intervención responsable y medible. La reflexión propone observar aves y chanchos, evaluar cada lanzamiento y ajustar la ayuda. En clase permite cerrar con la pregunta de qué datos adicionales harían falta para evaluar esa estabilidad.

El gráfico «Un equilibrio posible» muestra dos curvas que fluctúan y se estabilizan por encima de cero, cada especie en su propio nivel. Usa Red y un chancho sano del brandbook sobre el paisaje del Tema 4. Los personajes recorren las curvas; el ciclo dura 7,5 segundos e incluye una pausa de 2,7 segundos en el desenlace. Solo se anima mientras está visible y la pestaña está activa. Con movimiento reducido, HTML o CSS sin JavaScript, se muestra el estado final completo. El interruptor del brandbook cambia también esta escena.

El texto alternativo y el pie del gráfico describen cómo ambas poblaciones se estabilizan. La conversación de cierre puede relacionar esa estabilidad con el seguimiento de poblaciones, nacimientos, muertes e intervenciones.

## Referencias del proyecto en la presentación

La nueva diapositiva 4, «El punto de partida de Angry Birds Times», va inmediatamente después de «La autoría sigue en ustedes», que contiene «Decisiones del equipo» en la diapositiva 3. Se editó sobre la copia nativa «Vibe Coding COM208» y se verificó el guardado en Drive el 06-11-2026. Los enlaces de la lámina apuntan a GitHub Pages y no requieren el servidor del docente.

- **Base de datos:** [100 niveles](https://rexssaurus.github.io/com208-angry-birds/datos/angry_birds_100_niveles_simulados.csv), con las reglas de 4, 3 y 2 bajas por ave sin protección, con madera y con piedra.
- **Brandbook:** [Angry Birds Brand Guidelines (2011)](https://rexssaurus.github.io/com208-angry-birds/referencias/AngryBirds-2011.pdf), aportado por el docente. La copia está incluida en `referencias/` para abrirla durante la demo.
- **Pregunta:** «¿Cómo cambia el equilibrio de la isla cuando interviene el jugador?».
- **Tesis del relato:** «La ayuda humana puede desbalancear la isla. Medir y ajustar la intervención podría estabilizar ambas especies».

La lámina incluye una captura de los niveles 1 a 3 de la tabla y la portada original del brandbook. Las imágenes enlazan a sus archivos y conservan la pregunta y la tesis como texto editable. Su pie dice «La tesis orienta el relato y debe contrastarse con evidencia». Sus notas incluyen las fuentes, los enlaces y las proporciones. Dedicarle unos dos minutos dentro del bloque de fundamentos, sin añadir un workshop a esta primera sesión.

## Reactivar las secciones reservadas

Por instrucción del docente del 06-11-2026, las secciones 05 y 06 no forman parte del recorrido actual. Se mantienen su HTML, ilustraciones, datos, CSS y JavaScript. Para recuperarlas, retirar únicamente el atributo `hidden` de los elementos con `data-reserved-section="5"` y `data-reserved-section="6"` en `index.html`, `01-html.html` y `02-css.html`; después, comprobar el selector de protección y el gráfico de equilibrio antes de publicar. Se puede reactivar cada sección por separado.
