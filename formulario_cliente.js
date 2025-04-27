
// formulario_cliente.js FINAL MEJORADO

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
    const mensajeCliente = document.getElementById('mensajeCliente');

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
                mensajeCliente.innerText = '⚠️ Por favor complete todos los campos obligatorios.';
                mensajeCliente.style.color = 'red';
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
                    mensajeCliente.innerText = '❌ Error al registrar cliente: ' + (error.message || 'Error desconocido');
                    mensajeCliente.style.color = 'red';
                } else {
                    formulario.reset();
                    mensajeCliente.innerText = '✅ Cliente registrado exitosamente.';
                    mensajeCliente.style.color = 'green';
                }
            } catch (ex) {
                console.error('❌ Excepción al insertar:', ex);
                mensajeCliente.innerText = '❌ Error inesperado al registrar cliente.';
                mensajeCliente.style.color = 'red';
            }
        });
    }
});
