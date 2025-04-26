
function mostrarModal(formulario) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('contenidoModal');
    
    if (formulario === 'registroMovimiento') {
        contenido.innerHTML = '<h2>Formulario de Registro de Movimiento</h2><p>(Aquí se cargará el formulario dinámicamente)</p>';
    } else {
        contenido.innerHTML = '<p>Formulario no encontrado.</p>';
    }
    
    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
