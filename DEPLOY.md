# Cómo publicar el sitio SICONAP/S en Internet

El sitio es HTML/CSS/JS puro — no necesita servidor, base de datos ni instalación.
Cualquiera de las tres opciones siguientes lo pone online en minutos, de forma gratuita.

---

## Opción 1 — Netlify (Recomendada · más fácil)

1. Ir a https://netlify.com y crear cuenta gratuita (con Gmail o GitHub)
2. En el panel, hacer clic en **"Add new site" → "Deploy manually"**
3. Arrastrar la carpeta `SICONAPS/` completa al área de drop
4. ¡Listo! Netlify genera una URL tipo `https://siconaps-xyz.netlify.app`
5. Para usar dominio propio (ej. `siconaps.com.py`): ir a **Domain settings** y seguir los pasos

El archivo `netlify.toml` ya está configurado con headers de seguridad y caché optimizado.

---

## Opción 2 — GitHub Pages (gratuita, con control de versiones)

1. Crear cuenta en https://github.com
2. Crear nuevo repositorio público llamado `siconaps`
3. Subir todos los archivos de la carpeta `SICONAPS/`
4. Ir a **Settings → Pages → Branch: main → / (root)** → Save
5. El sitio queda en `https://tu-usuario.github.io/siconaps/`

---

## Opción 3 — Hosting tradicional (cPanel / FTP)

Si ya tienen un plan de hosting contratado:

1. Conectarse al panel FTP (con FileZilla u otro cliente)
2. Subir todos los archivos de `SICONAPS/` a la carpeta `public_html/`
3. El sitio queda disponible en el dominio del hosting

---

## Checklist antes de publicar

- [ ] Copiar logo a `assets/logo.png`
- [ ] Crear imagen para redes `assets/og-image.jpg` (1200×630 px)
- [ ] Reemplazar fotos de galería en `assets/galeria/` (opcional)
- [ ] Verificar el número de WhatsApp en el botón flotante
- [ ] Agregar fotos de la Comisión Directiva en `assets/directiva/`
- [ ] Actualizar horario de atención si es diferente
- [ ] (Opcional) Registrar dominio `.com.py` o `.org.py`

---

## Estructura de archivos

```
SICONAPS/
├── index.html          ← página principal
├── style.css           ← todos los estilos
├── script.js           ← toda la interactividad
├── netlify.toml        ← configuración Netlify
└── assets/
    ├── favicon.svg     ← ícono del navegador
    ├── logo.png        ← logo oficial (agregar)
    ├── og-image.jpg    ← imagen para redes (agregar)
    ├── directiva/      ← fotos de la Comisión Directiva
    └── galeria/        ← fotos institucionales
```
