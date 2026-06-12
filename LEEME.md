# Pokédex PWA — Cómo publicarla e instalarla

## Qué hay en este paquete

- `index.html` — la app completa
- `manifest.webmanifest` — la hace instalable como app
- `sw.js` — service worker: cachea la app, los datos, sprites y gritos de PokéAPI (los pokémones ya escaneados funcionan sin internet)
- `icon-192.png` / `icon-512.png` — íconos de la app

## Paso 1: Consigue tu clave de API (gratis)

1. Entra a https://aistudio.google.com con tu cuenta de Google
2. Ve a **Get API key** → **Create API key** (empieza con `AIza`)
3. No necesitas tarjeta: el nivel gratuito de Gemini incluye visión y alcanza para cientos de escaneos al día

## Paso 2: Publica la app (opción GitHub Pages, gratis)

1. Crea un repositorio nuevo en GitHub (puede ser privado con Pages... mejor público y simple)
2. Sube los 5 archivos de este paquete a la raíz del repo
3. Ve a **Settings → Pages → Source: Deploy from a branch → main → / (root)** y guarda
4. En 1-2 minutos tu app estará en `https://TU_USUARIO.github.io/TU_REPO/`

Alternativas igual de fáciles: Netlify Drop (arrastra la carpeta a https://app.netlify.com/drop) o Vercel.

## Paso 3: Instálala en tu Android

1. Abre la URL en **Chrome** en tu teléfono
2. Toca el botón **⚙** y pega tu clave de API → GUARDAR
3. Menú de Chrome (⋮) → **"Agregar a pantalla de inicio"** / **"Instalar app"**
4. ¡Listo! Tendrás el ícono del Pokédex como una app más, a pantalla completa

## Notas

- La clave se guarda SOLO en tu teléfono (localStorage). No la compartas ni subas a ningún lado.
- La app necesita internet para identificar (IA con Gemini) y para pokémones nuevos; los ya escaneados quedan en caché y funcionan offline.
- Si un día sale error de "límite alcanzado", es el tope diario del nivel gratuito de Gemini; se reinicia al día siguiente.
- Si actualizas archivos en el repo, cambia el nombre del caché en `sw.js` (por ejemplo `pokedex-v2`) para forzar la actualización.
- Proyecto de uso personal: los nombres y datos de Pokémon son propiedad de The Pokémon Company / Nintendo. No la distribuyas públicamente.
