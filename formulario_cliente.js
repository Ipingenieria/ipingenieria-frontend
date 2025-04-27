
// Ahora este archivo usa la conexión global ya existente: supabase

document.getElementById('formularioCliente').addEventListener('submit', async function(event) {
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

    const { data, error } = await supabase.from('clientes').insert([{
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
        document.getElementById('formularioCliente').reset();
        document.getElementById('mensajeCliente').innerText = '✅ Cliente registrado exitosamente.';
    }
});
