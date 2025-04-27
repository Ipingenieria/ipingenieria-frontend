
// Configura tu conexión Supabase aquí
const SUPABASE_URL = 'https://TU_SUPABASE_URL.supabase.co';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('formularioCliente').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('tipo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const nit = document.getElementById('nit').value.trim();
    const contacto = document.getElementById('contacto').value.trim();
    const observaciones = document.getElementById('observaciones').value.trim();

    if (!nombre || !tipo) {
        document.getElementById('mensajeCliente').innerText = 'Por favor complete los campos obligatorios.';
        return;
    }

    const { data, error } = await supabase.from('clientes').insert([{
        nombre: nombre,
        tipo: tipo,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        ciudad: ciudad,
        nit: nit,
        contacto: contacto,
        observaciones: observaciones
    }]);

    if (error) {
        document.getElementById('mensajeCliente').innerText = 'Error al registrar: ' + error.message;
    } else {
        document.getElementById('formularioCliente').reset();
        document.getElementById('mensajeCliente').innerText = 'Cliente registrado exitosamente.';
    }
});
