
const supabase = window.supabase.createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

function formatearValor(valor) {
  return '$' + parseFloat(valor).toLocaleString('es-CO');
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-CO');
}

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

    const estadoTd = document.querySelector(`#estado-valor-${cotizacionId}`);
    const contenedorAcciones = document.querySelector(`#estado-contenedor-${cotizacionId}`);

    if (estadoTd) {
      estadoTd.textContent = nuevoEstado;
      estadoTd.className = nuevoEstado === 'aprobada' ? 'estado-aprobada' :
                           nuevoEstado === 'rechazada' ? 'estado-rechazada' :
                           'estado-pendiente';
    }

    if (contenedorAcciones) {
      contenedorAcciones.innerHTML = '';

      if (nuevoEstado === 'aprobada') {
        const botonAgendar = document.createElement('button');
        botonAgendar.className = 'agendar';
        botonAgendar.textContent = '📅 Agendar Visita';
        botonAgendar.onclick = () => {
          window.location.href = `agenda.html?cotizacion_id=${cotizacionId}`;
        };
        contenedorAcciones.appendChild(botonAgendar);
      }
    }
  } catch (err) {
    console.error('Excepción al actualizar estado:', err);
    alert('Ocurrió un error inesperado.');
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const { data: cotizaciones, error: errorCot } = await supabase
    .from('cotizaciones')
    .select('*')
    .order('fecha_creacion', { ascending: false });

  const { data: clientes, error: errorCli } = await supabase
    .from('clientes')
    .select('id, nombre');

  if (errorCot || errorCli) {
    console.error('Error cargando cotizaciones o clientes:', errorCot || errorCli);
    return;
  }

  const mapClientes = {};
  clientes.forEach(c => { mapClientes[c.id] = c.nombre; });

  const tbody = document.getElementById('cotizaciones-body');
  cotizaciones.forEach(cotizacion => {
    const estadoClass = cotizacion.estado === 'aprobada' ? 'estado-aprobada'
                       : cotizacion.estado === 'rechazada' ? 'estado-rechazada'
                       : 'estado-pendiente';

    const nombreCliente = mapClientes[cotizacion.cliente_id] || '🔍 No encontrado';

    const row = document.createElement('tr');
    row.innerHTML = `
      
    <td>
      ${cotizacion.id.slice(0, 4)}...${cotizacion.id.slice(-4)}
      <button onclick="copiarID('${cotizacion.id}')" title="Copiar ID" style="margin-left:5px;">📋</button>
    </td>
    <td>${nombreCliente}</td>
      <td>${formatearFecha(cotizacion.fecha_creacion)}</td>
      <td>${cotizacion.encabezado_tipo || '-'}</td>
      <td>${formatearValor(cotizacion.valor_total)}</td>
      <td id="estado-valor-${cotizacion.id}" class="${estadoClass}">${cotizacion.estado}</td>
      <td id="estado-contenedor-${cotizacion.id}">
        ${cotizacion.estado === 'pendiente' ? `
          <button class="aprobar" onclick="actualizarEstado('${cotizacion.id}', 'aprobada')">✅ Aprobar</button>
          <button class="rechazar" onclick="actualizarEstado('${cotizacion.id}', 'rechazada')">❌ Rechazar</button>
        ` : ''}
        ${cotizacion.estado === 'aprobada' ? `
          <button class="agendar" onclick="window.location.href='agenda.html?cotizacion_id=${cotizacion.id}'">📅 Agendar Visita</button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(row);
  });
});

function copiarID(id) {
  navigator.clipboard.writeText(id).then(() => {
    alert("ID copiado al portapapeles: " + id);
  }).catch(err => {
    console.error('Error al copiar el ID: ', err);
  });
}
