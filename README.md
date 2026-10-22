# Espacio en Blanco · Web de reservas (demo)

Web estática para la sala de eventos **Espacio en Blanco** (Torrijos, Toledo): calendario de disponibilidad, solicitud de reserva por WhatsApp con señal por Bizum, petición de visita, galería y preguntas frecuentes.

HTML, CSS y JavaScript puro. Sin dependencias ni compilación.

## Estructura

```
index.html   Página
styles.css   Estilos
app.js       Calendario, formularios y enlaces de WhatsApp
config.js    ← Lo que se edita: teléfono, señal, fechas ocupadas, extras
img/         Fotos
```

## Cómo se gestionan las reservas

1. El cliente elige un día **libre** y envía la solicitud. Se abre WhatsApp con todo escrito.
2. El dueño responde y apunta la fecha en la Google Sheet como **Pendiente**. En la web sale como "pre-reservado" y nadie más puede pedirla.
3. Al recibir el Bizum de la señal, cambia el estado a **Reservado**.
4. Si se cancela, borra la fila o pon **Cancelado** y el día vuelve a estar libre.

Estados válidos en la columna B: `Reservado`, `Pendiente`, `Bloqueado` (vacaciones, mantenimiento), `Cancelado`.

### Montar la Google Sheet (una vez, 5 minutos)

1. Crea una hoja de cálculo en Google Sheets e importa `calendario.csv` (o escribe a mano: columna A **Fecha** `14/11/2026`, columna B **Estado**).
2. **Archivo → Compartir → Publicar en la web**. Elige solo esa pestaña y el formato **Valores separados por comas (.csv)**. Pulsa **Publicar** y copia el enlace.
3. En `config.js`, pega el enlace en `calendarioCsv`.

Desde ese momento el dueño solo toca la hoja, desde la app de Google Sheets del móvil. Los cambios tardan unos minutos en verse en la web, porque Google refresca la versión publicada cada 5 minutos aproximadamente.

**Importante:** lo publicado es visible para cualquiera que tenga el enlace. En esa pestaña pon **solo fecha y estado**, nunca nombres, teléfonos ni DNI de clientes. Si quiere llevar esos datos, que use otra pestaña sin publicar.

Si la hoja no carga, la web usa las fechas de `ocupadas` en `config.js` y avisa de que la disponibilidad es orientativa.

Pon `demo: false` en `config.js` para quitar la franja de "versión demo".

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Web Espacio en Blanco"
git branch -M main
git remote add origin https://github.com/alvaroszdev/espacio-en-blanco.git
git push -u origin main
```

Después, en GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**. Quedará en `https://alvaroszdev.github.io/espacio-en-blanco/`.

## Siguiente fase (versión de pago)

- Panel del dueño (Django) para confirmar reservas, bloquear días y marcar la señal como cobrada
- Recordatorios automáticos (señal pendiente, "tu evento es en 3 días")
- Ficha de cliente y contrato firmados online
- Dominio propio
