# Cotizador Novatrade (app instalable)

App web instalable (PWA) para cotizar operaciones de importación desde el celular. Funciona sin internet una vez abierta la primera vez.

## Archivos (súbalos todos, sin carpetas)

- `index.html` – la app
- `manifest.webmanifest`, `sw.js` – hacen que se instale y funcione sin internet
- `jspdf.umd.min.js`, `jspdf.plugin.autotable.min.js` – generan el PDF
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` – íconos

## Publicar en GitHub Pages

1. En GitHub, abra su repositorio (o cree uno nuevo, por ejemplo `cotizador-novatrade`).
2. **Add file → Upload files**. Arrastre los 9 archivos de esta carpeta (no el .zip) y pulse **Commit changes**.
3. **Settings → Pages**. En *Build and deployment* elija **Deploy from a branch**, rama **main**, carpeta **/ (root)** y pulse **Save**.
4. Espere 1 o 2 minutos. La dirección será `https://SU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Si el repositorio ya tiene otras apps, cree uno nuevo para esta, o suba los archivos a una subcarpeta (la app usa rutas relativas y funciona en cualquier carpeta). Si lo pone en una carpeta que ya tiene un `index.html`, lo reemplazará.

## Instalar en el celular

- **Android (Chrome):** abra la dirección, menú ⋮ → **Instalar app**.
- **iPhone (Safari):** abra la dirección, botón Compartir → **Agregar a inicio**.

Quedará un ícono «Cotizador» que abre la app en pantalla completa.

## Notas

- Las cotizaciones guardadas viven en el propio teléfono. Use **Guardadas → Exportar copia** de vez en cuando; la copia se importa en otro equipo con **Importar copia**.
- Cualquiera que tenga la dirección puede usar la app (no contiene claves ni datos de clientes; los datos se guardan solo en cada teléfono). No la comparta públicamente.
- **Actualizar la app:** reemplace `index.html` en GitHub y cambie `VERSION = 'v1'` por `'v2'` en `sw.js`. Los teléfonos reciben la versión nueva al abrirla (a veces con una segunda apertura).
- Datos de Novatrade para el PDF (teléfono, correo, dirección): pestaña **Cliente → Datos de Novatrade**, en cada teléfono.
