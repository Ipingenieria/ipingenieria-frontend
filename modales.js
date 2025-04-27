
// Función para mostrar un modal
function mostrarModal(formulario) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('contenidoModal');
    
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
}

// Manejar submenús desplegables
document.addEventListener('DOMContentLoaded', function() {
    const titulosMenu = document.querySelectorAll('.menu-titulo');
    const botonMenu = document.getElementById('boton-menu');
    const menuLateral = document.querySelector('.menu-lateral');

    titulosMenu.forEach(function(titulo) {
        titulo.addEventListener('click', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.classList.toggle('activo');
            }
        });
    });

    // Mostrar/ocultar el menú lateral en móviles
    botonMenu.addEventListener('click', function() {
        menuLateral.classList.toggle('mostrar');
    });
});
