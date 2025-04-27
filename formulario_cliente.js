
// formulario_cliente.js FINAL optimizado

// Función para actualizar el placeholder dinámicamente según tipo de cliente
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

            // Capturar valores
            const tipo = document.getElementById('tipo').value.trim();
            const nit = document.getElementById('nit').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const ciudad = document.getElementById('ciudad').value.trim();
            const contacto = document.getElementById('contacto').value.trim();
            const observaciones = document.getElementById('observaciones').value.trim();

            // Validar campos obligatorios mínimos
            if (!tipo || !nit || !nombre || !telefono || !correo || !direccion || !ciudad) {
                document.getElementById('mensajeCliente').innerText = '⚠️ Por favor complete todos los campos obligatorios.';
                return;
            }

            try {
                const { data, error } = await supabaseClient
                    .from('clientes')
                    .insert([{
                        nombre: nombre,
                        tipo: tipo,
                        telefono: telefono,
                        correo: correo,
                        direccion: direccion,
                        ciudad: ciudad,
                        nit: nit,
                        contacto: contacto,
                        observaciones: observaciones || 'Sin observaciones'
                    }]);

                if (error) {
                    console.error('❌ Error Supabase:', error);
                    document.getElementById('mensajeCliente').innerText = '❌ Error al registrar cliente: ' + (error.message || 'Error desconocido');
                } else {
                    formulario.reset();
                    document.getElementById('mensajeCliente').innerText = '✅ Cliente registrado exitosamente.';
                }
            } catch (ex) {
                console.error('❌ Excepción al insertar:', ex);
                document.getElementById('mensajeCliente').innerText = '❌ Error inesperado al registrar cliente.';
            }
        });
    }
});
