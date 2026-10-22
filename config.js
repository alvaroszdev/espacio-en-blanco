/* ===========================================================
   CONFIGURACIÓN — Espacio en Blanco
   Todo lo que el dueño puede querer cambiar está aquí.
   =========================================================== */
window.EB_CONFIG = {
  // Muestra la franja "versión demo" arriba. Ponlo a false al publicar de verdad.
  demo: true,

  // WhatsApp de reservas (formato internacional, sin + ni espacios)
  whatsapp: "34689299178",
  telefonoVisible: "689 299 178",
  email: "espacioenblancotorrijos@gmail.com",
  direccion: "C/ Ocaña 1, 45500 Torrijos, Toledo",
  instagram: "__espacioenblanco",

  // Señal para bloquear la fecha
  senal: 50,

  // CALENDARIO: enlace CSV de la Google Sheet publicada (ver README).
  // Si está vacío, o falla, se usan las fechas de "ocupadas" de abajo.
  calendarioCsv: "calendario.csv",

  // Fechas de reserva de respaldo (AAAA-MM-DD)
  ocupadas: [
    "2026-10-24", "2026-10-25", "2026-10-31",
    "2026-11-01", "2026-11-07", "2026-11-14", "2026-11-15", "2026-11-21", "2026-11-28",
    "2026-12-05", "2026-12-06", "2026-12-08", "2026-12-12", "2026-12-13", "2026-12-19",
    "2026-12-20", "2026-12-24", "2026-12-26", "2026-12-31",
    "2027-01-02", "2027-01-05", "2027-01-16", "2027-01-30",
    "2027-02-13", "2027-02-27",
    "2027-03-13", "2027-03-20",
    "2027-04-10", "2027-04-24",
    "2027-05-01", "2027-05-02", "2027-05-08", "2027-05-09", "2027-05-15",
    "2027-05-16", "2027-05-22", "2027-05-23", "2027-05-29", "2027-05-30",
    "2027-06-05", "2027-06-12"
  ],

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

  // Franjas para visitar el local
  franjasVisita: ["Mañana (10:00–13:00)", "Tarde (17:00–20:00)"]
};
