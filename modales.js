
// modales.js - Fragmento corregido para abrir formulario Cliente

function abrirModalCrearCliente() {
    cargarFormulario('formulario_cliente.html', 'crearCliente')
        .then(() => {
            // Después de cargar el HTML, inicializamos la conexión al botón
            inicializarFormularioCliente();
        })
        .catch((error) => {
            console.error('❌ Error cargando el formulario de cliente:', error);
        });
}

// Función genérica para cargar cualquier formulario en el modal
function cargarFormulario(url, tituloModal) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('modalTitulo').innerText = tituloModal;
            document.getElementById('modalContenido').innerHTML = html;
        })
        .catch(error => {
            console.error('❌ Error al cargar formulario:', error);
        });
}
