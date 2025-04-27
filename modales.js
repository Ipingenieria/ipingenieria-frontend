
// Función para mostrar un modal
function mostrarModal(formulario) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('contenidoModal');
    
    // Lógica para cargar contenido dinámicamente (temporal por ahora)
    contenido.innerHTML = '<h2>' + formulario.replace(/([A-Z])/g, ' $1') + '</h2><p>(Aquí irá el formulario de ' + formulario + ')</p>';
    
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Función de ejemplo para cerrar sesión
function cerrarSesion() {
    alert('Sesión cerrada exitosamente.');
    // Puedes agregar aquí redirección o limpieza de sesión si quieres
}

// NUEVO: Habilitar despliegue de submenús por click en móviles
document.addEventListener('DOMContentLoaded', function() {
    const titulosMenu = document.querySelectorAll('.menu-titulo');
    
    titulosMenu.forEach(function(titulo) {
        titulo.addEventListener('click', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                // Alternar visibilidad
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            }
        });
    });
});
