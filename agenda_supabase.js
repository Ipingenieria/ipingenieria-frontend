
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inicializar Supabase
const supabase = createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

// Cargar lista de clientes
async function cargarClientes() {
  const { data, error } = await supabase.from('clientes').select('id, nombre');
  const select = document.getElementById('cliente_id');

  if (error) {
    console.error('Error cargando clientes:', error);
    return;
  }

  data.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    select.appendChild(option);
  });
}

// Registrar visita técnica
document.getElementById('formAgenda').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cliente_id = document.getElementById('cliente_id').value;
  const servicio = document.getElementById('servicio').value.trim();
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const prioridad = document.getElementById('prioridad').value;
  const observaciones = document.getElementById('observaciones').value.trim();

  if (!cliente_id || !servicio || !fecha || !hora) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const { data, error } = await supabase.from('agenda').insert([
    {
      cliente_id,
      servicio,
      fecha,
      hora,
      prioridad,
      observaciones,
    },
  ]);

  if (error) {
    console.error('❌ Error al registrar la visita:', error);
    alert('Error al registrar. Revisa consola.');
    return;
  }

  alert('✅ Visita registrada exitosamente.');
  document.getElementById('formAgenda').reset();
});

cargarClientes();
