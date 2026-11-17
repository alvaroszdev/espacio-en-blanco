/* ===========================================================
   CONFIGURACIÓN — Espacio en Blanco
   Todo lo que el dueño puede querer cambiar está aquí.
   =========================================================== */
window.EB_CONFIG = {
  // Muestra la franja "versión demo" arriba. Ponlo a false al publicar de verdad.
  demo: true,

  // WhatsApp de reservas (formato internacional, sin + ni espacios)
  whatsapp: "34686711027",
  telefonoVisible: "686711027",
  email: "alvarosz86@gmail.com",
  direccion: "C/ Ocaña 1, 45500 Torrijos, Toledo",
  instagram: "__espacioenblanco",

  // Señal para bloquear la fecha
  senal: 50,

  // CALENDARIO: enlace CSV de la Google Sheet publicada (ver README).
  // Si está vacío, o falla, se usan las fechas de "ocupadas" de abajo.
  calendarioCsv: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeKECklPhfBXjNa0SYMfbfWxD5ROcJg7v964PdxSbipHzsSs3abVpvGyoenm-OtkCSioFv0HJ3fFEt/pub?gid=0&single=true&output=csv",

  // Cuántos meses hacia delante se pueden consultar y pedir en el calendario
  mesesVisibles: 18,

  // Fechas de respaldo (AAAA-MM-DD): solo se usan si la hoja de Google no carga.
  // Déjalo vacío: las reservas reales se marcan en la hoja.
  ocupadas: [],

  // Días bloqueados por el local (mantenimiento, vacaciones…)
  bloqueadas: [],

  tiposEvento: [
    "Cumpleaños infantil", "Cumpleaños adulto", "Comunión", "Bautizo",
    "Fiesta de empresa / Navidad", "Baby shower", "Otro evento"
  ],

  // Extras que el cliente puede marcar al reservar. "nota" se muestra debajo.
  extras: [
    { id: "almacen", nombre: "Uso del almacén el día anterior", nota: "Para dejar comida, bebida o decoración la víspera" },
    { id: "decoracion", nombre: "Decoración del evento", nota: "Arcos de globos, photocall, temáticas…" },
    { id: "catering", nombre: "Catering", nota: "Os ponemos en contacto con nuestro catering colaborador" },
    { id: "limpieza", nombre: "Servicio de limpieza", nota: "Olvídate de recoger al terminar" },
    { id: "infantil", nombre: "Sala de juegos infantiles", nota: "Zona para que los peques jueguen" }
  ],

  // Horarios de alquiler (PENDIENTE: confirmar las horas con Lidia)
  // "porDefecto: true" marca la opción que sale elegida al abrir el formulario.
  horarios: [
    { nombre: "Mañana", horas: "10:00 a 16:00" },
    { nombre: "Tarde", horas: "17:00 a 23:00", porDefecto: true },
    { nombre: "Día completo", horas: "10:00 a 23:00" }
  ],

  // Franjas para visitar el local
  franjasVisita: ["Mañana (10:00–13:00)", "Tarde (17:00–20:00)"]
};
