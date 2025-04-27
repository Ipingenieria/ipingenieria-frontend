
// formulario_cliente.js corregido

// Función para actualizar placeholder dinámicamente
function actualizarPlaceholderNit() {
    const tipo = document.getElementById('tipo').value;
    const campoNit = document.getElementById('nit');
    if (tipo === 'Persona Natural') {
        campoNit.placeholder = 'Ingrese número de cédula...';
    } else if (tipo === 'Persona Jurídica') {
        campoNit.placeholder = 'Ingrese número de NIT...';
    } else {
        campoNit.placeholder = 'Ingrese número de identificación...';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioCliente');
    if (formulario) {
        formulario.addEventListener('submit', async function(event) {
            event.preventDefault();

            const tipo = document.getElementById('tipo').value.trim();
            const nit = document.getElementById('nit').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const ciudad = document.getElementById('ciudad').value.trim();
            const contacto = document.getElementById('contacto').value.trim();
            const observaciones = document.getElementById('observaciones').value.trim();

            if (!tipo || !nit || !nombre) {
                document.getElementById('mensajeCliente').innerText = 'Por favor complete los campos obligatorios.';
                return;
            }

            const { data, error } = await supabaseClient.from('clientes').insert([{
                tipo: tipo,
                nit: nit,
                nombre: nombre,
                telefono: telefono,
                correo: correo,
                direccion: direccion,
                ciudad: ciudad,
                contacto: contacto,
                observaciones: observaciones
            }]);

            if (error) {
                document.getElementById('mensajeCliente').innerText = '❌ Error al registrar: ' + error.message;
            } else {
                formulario.reset();
                document.getElementById('mensajeCliente').innerText = '✅ Cliente registrado exitosamente.';
            }
        });
    }
});
