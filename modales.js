/* ==========================================================
   MODALES BÁSICOS – Sistema Empresarial IP Profesional
   ----------------------------------------------------------
   mostrarModal(id)  : abre el modal cuyo ID recibimos
   cerrarModal(id)   : cierra el modal cuyo ID recibimos
   Clic fuera del modal   : también lo cierra
   Estilos mínimos       : usa la clase .modal (display:none)
                           y .modal.mostrar (display:flex)
   ========================================================== */

export function mostrarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add('mostrar');     // <div class="modal mostrar">
    // Opcional: bloquea scroll al abrir
    document.body.style.overflow = 'hidden';
  } else {
    console.error('No se encontró el modal con ID:', idModal);
  }
}

export function cerrarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove('mostrar');
    document.body.style.overflow = '';  // reactiva scroll
  } else {
    console.error('No se encontró el modal con ID:', idModal);
  }
}

/* Cierra cualquier modal abierto si haces clic en el fondo
   (el div con clase .modal, no el contenido interno) */
document.addEventListener('click', (e) => {
  const abierto = document.querySelectorAll('.modal.mostrar');
  abierto.forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove('mostrar');
      document.body.style.overflow = '';
    }
  });
});

/* Soporte para tecla Esc: cierra el primer modal abierto */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal.mostrar');
    if (modal) {
      modal.classList.remove('mostrar');
      document.body.style.overflow = '';
    }
  }
});
