
// Función para mostrar un modal y cargar contenido dinámico real
function mostrarModal(formulario) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('contenidoModal');
    
    // Mostrar el modal
    modal.style.display = 'block';

    if (formulario === 'crearCliente') {
        // Cargar formulario_cliente.html real
        fetch('formulario_cliente.html')
            .then(response => response.text())
            .then(html => {
                contenido.innerHTML = html;
                cargarScriptFormularioCliente(); // Cargar el JS después del HTML
            })
            .catch(error => {
                contenido.innerHTML = '<p>Error al cargar el formulario.</p>';
            });
    } else {
        // Otros formularios (pendiente para futuras versiones)
        contenido.innerHTML = '<h2>' + formulario.replace(/([A-Z])/g, ' $1') + '</h2><p>(Aquí irá el formulario de ' + formulario + ')</p>';
    }
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

// Cargar dinámicamente el formulario_cliente.js después de insertar el HTML
function cargarScriptFormularioCliente() {
    const script = document.createElement('script');
    script.src = 'formulario_cliente.js';
    script.defer = true;
    document.body.appendChild(script);
}

// Mejorar comportamiento de submenús según dispositivo
document.addEventListener('DOMContentLoaded', function() {
    const titulosMenu = document.querySelectorAll('.menu-titulo');

    function esMovil() {
        return window.innerWidth <= 768;
    }

    titulosMenu.forEach(function(titulo) {
        if (esMovil()) {
            titulo.addEventListener('click', function() {
                const submenu = this.querySelector('.submenu');
                if (submenu) {
                    submenu.classList.toggle('activo');
                }
            });
        }
    });

    // Botón hamburguesa
    const botonMenu = document.getElementById('boton-menu');
    const menuLateral = document.querySelector('.menu-lateral');

    if (botonMenu) {
        botonMenu.addEventListener('click', function() {
            menuLateral.classList.toggle('mostrar');
        });
    }
});
