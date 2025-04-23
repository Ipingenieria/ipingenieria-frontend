
// Inicializar cliente Supabase correctamente
const { createClient } = supabase;
const supabase = createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

async function actualizarEstado(cotizacionId, nuevoEstado) {
  try {
    const { data, error } = await supabase
      .from('cotizaciones')
      .update({ estado: nuevoEstado })
      .eq('id', cotizacionId);

    if (error) {
      console.error('Error actualizando estado:', error);
      alert('Error al actualizar el estado.');
      return;
    }

    alert('Estado actualizado correctamente.');

    if (nuevoEstado === 'Aprobada') {
      const botonAgendar = document.createElement('button');
      botonAgendar.textContent = '📅 Agendar Visita';
      botonAgendar.className = 'btn-agendar';
      botonAgendar.onclick = () => {
        window.location.href = `agenda.html?cotizacion_id=${cotizacionId}`;
      };

      const contenedor = document.getElementById(`estado-contenedor-${cotizacionId}`);
      if (contenedor) {
        contenedor.appendChild(botonAgendar);
      }
    }

  } catch (err) {
    console.error('Excepción al actualizar estado:', err);
    alert('Ocurrió un error inesperado.');
  }
}

// Simulación de cotizaciones (solo para pruebas visuales, puedes quitar esto si usas datos reales)
document.addEventListener("DOMContentLoaded", async () => {
  const cotizaciones = [
    { id: '1', cliente: 'Edificio A', servicio: 'CCTV', estado: 'Pendiente' },
    { id: '2', cliente: 'Conjunto B', servicio: 'Citofonía', estado: 'Pendiente' }
  ];

  const tbody = document.getElementById('cotizaciones-body');
  cotizaciones.forEach(cotizacion => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cotizacion.cliente}</td>
      <td>${cotizacion.servicio}</td>
      <td id="estado-contenedor-${cotizacion.id}">
        <button onclick="actualizarEstado('${cotizacion.id}', 'Aprobada')">✅ Aprobar</button>
        <button onclick="actualizarEstado('${cotizacion.id}', 'Rechazada')">❌ Rechazar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
});
