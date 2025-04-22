// cotizaciones.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://uyobgstmfukqncebtoli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Cargar clientes en el select
async function cargarClientes() {
  const { data, error } = await supabase.from('clientes').select('*').order('nombre', { ascending: true });

  if (error) {
    console.error('Error al cargar clientes:', error);
    return;
  }

  const clienteSelect = document.getElementById('cliente');
  data.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    clienteSelect.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();
});
