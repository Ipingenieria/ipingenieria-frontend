
// Inicializar Supabase
const supabase = window.supabase.createClient(
    'https://uyobgstmfukqncebtoli.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

function abrirModal(tipo) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('formulario-contenido');
    contenido.innerHTML = '';

    if (tipo === 'financiero') {
        contenido.innerHTML = '<h2>Formulario Financiero General</h2>';
    } else if (tipo === 'inventario') {
        contenido.innerHTML = '<h2>Formulario Inventario General</h2>';
    } else if (tipo === 'proyecto') {
        contenido.innerHTML = '<h2>Formulario Movimiento Proyecto</h2>';
    }

    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
