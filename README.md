# Counter-Strike Web · Operación Polvo

Clon de Counter-Strike que corre completamente en tu navegador, sin instalaciones ni servidores de juego. Mapa **Operación Polvo** con dos bombsites, bots con IA, economía por rondas y bomba C4.

## Jugar

Una vez activado GitHub Pages (ver abajo), el juego está disponible en:

**https://silverlinegames.github.io/cs2/**

## Características

- **Mapa 3D Operación Polvo**: callejones, cajas, pasadizos y dos bombsites (A y B) con señalética.
- **Bots con IA**: 4 niveles de dificultad (Fácil / Normal / Difícil / Experto), tácticas por equipo, visión, audición y granadas.
- **Partidas configurables**: elige equipo (Antiterroristas o Terroristas), formato 3v / 4v / 5v y victoria a 8 o 16 rondas.
- **Economía por rondas**: dinero al matar, al ganar/perder, menú de compra (B) con pistolas, subfusiles, rifles, AWP, chalecos, casco y kit de desactivación.
- **Bomba C4**: los terroristas la plantan en el sitio A o B; los antiterroristas la desactivan (más rápido con kit).
- **Armas realistas**: USP-S, Glock-18, MP5, Galil, FAMAS, AK-47, M4A1, AWP con retroceso, dispersión y sonidos propios.
- **HUD completo**: vida, chaleco, munición, dinero, killfeed, radar, temporizador de ronda y marcador (TAB).

## Controles

| Tecla | Acción |
| --- | --- |
| W A S D | Moverse |
| Ratón | Apuntar |
| Clic izq. | Disparar |
| Clic der. / Shift | Apuntar con mira / caminar sigiloso |
| R | Recargar |
| B | Menú de compra (en zona de compra, al inicio de ronda) |
| E | Plantar / desactivar la bomba |
| 1 / 2 / 3 | Cambiar arma / cuchillo |
| TAB | Marcador |
| M | Volver al menú |
| Espacio / Ctrl | Saltar / agacharse |

## Cómo activar GitHub Pages

1. Entra a **Settings → Pages** del repositorio.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Rama: **main** · Carpeta: **/ (root)**.
4. Pulsa **Save** y espera 1-2 minutos.

El sitio quedará publicado en `https://silverlinegames.github.io/cs2/`.

## Notas técnicas

- El motor 3D es **Three.js r128**, cargado desde CDN con respaldo.
- El código del juego viaja comprimido (gzip + base64) en `game.bundle.1..4.b64`; `loader.js` lo descarga, lo descomprime con `DecompressionStream` y lo ejecuta. Así el repo queda listo para GitHub Pages con carga rápida.
- `loader.js` contiene una tabla `ERRATA` con 3 correcciones menores de caracteres del paquete (idempotentes: solo aplican si el carácter aún no es el correcto). Si algún día regeneras los archivos `game.bundle.*.b64`, elimina esa tabla del loader.
- Las texturas del mundo se generan **proceduralmente en canvas** (con mapas normales calculados por sobel), por lo que no hay binarios que mantener. Armas, camuflajes, cielo, decals y sonidos (WebAudio) también son 100% procedurales.
- Compatible con Chrome/Edge 80+, Firefox 113+ y Safari 16.4+.
