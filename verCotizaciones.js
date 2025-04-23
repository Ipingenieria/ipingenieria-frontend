
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

async function cargarCotizaciones() {
  const { data: cotizaciones, error } = await supabase
    .from('cotizaciones')
    .select(`
      id,
      cliente_id,
      encabezado_tipo,
      forma_pago,
      valor_total,
      estado,
      fecha_creacion,
      clientes (
        nombre
      )
    `)
    .order('fecha_creacion', { ascending: false });

  if (error) {
    console.error('Error al cargar cotizaciones:', error);
    return;
  }

  const contenedor = document.getElementById('contenedorCotizaciones');
  contenedor.innerHTML = '';

  for (const c of cotizaciones) {
    const nombreCliente = c.clientes?.nombre || 'Sin nombre';

    const card = document.createElement('div');
    card.classList.add('cotizacion-card');

    card.innerHTML = `
      <h3>📌 ${c.encabezado_tipo}</h3>
      <p><strong>🏢 Cliente:</strong> ${nombreCliente}</p>
      <p><strong>💰 Total:</strong> $${Number(c.valor_total).toLocaleString()}</p>
      <p><strong>💳 Forma de pago:</strong> ${c.forma_pago}</p>
      <p><strong>📅 Fecha:</strong> ${new Date(c.fecha_creacion).toLocaleDateString()}</p>
      <p><strong>📄 Estado:</strong> ${c.estado || 'pendiente'}</p>
    `;

    // Botón Detalle
    const verBtn = document.createElement('button');
    verBtn.textContent = '👁 Ver Detalle';
    verBtn.addEventListener('click', () => verDetalle(c.id));
    card.appendChild(verBtn);

    // Botones según estado
    if (c.estado === 'aprobada') {
      const agendarBtn = document.createElement('button');
      agendarBtn.textContent = '📅 Agendar Visita';
      agendarBtn.addEventListener('click', () => agendarVisita(c.id));
      card.appendChild(agendarBtn);
    } else if (c.estado === 'rechazada') {
      const rechazadaMsg = document.createElement('p');
      rechazadaMsg.innerHTML = '<strong style="color: red;">❌ Cotización Rechazada</strong>';
      card.appendChild(rechazadaMsg);
    } else {
      const aprobarBtn = document.createElement('button');
      aprobarBtn.textContent = '✅ Aprobar';
      aprobarBtn.addEventListener('click', () => actualizarEstado(c.id, 'aprobada'));
      card.appendChild(aprobarBtn);

      const rechazarBtn = document.createElement('button');
      rechazarBtn.textContent = '❌ Rechazar';
      rechazarBtn.addEventListener('click', () => actualizarEstado(c.id, 'rechazada'));
      card.appendChild(rechazarBtn);
    }

    contenedor.appendChild(card);
  }
}

async function actualizarEstado(id, nuevoEstado) {
  const { error } = await supabase
    .from('cotizaciones')
    .update({ estado: nuevoEstado })
    .eq('id', id);

  if (error) {
    console.error('Error al actualizar estado:', error);
    alert('❌ Error al actualizar el estado');
    return;
  }

  alert(`✔️ Cotización actualizada a "${nuevoEstado}"`);
  cargarCotizaciones();
}

async function agendarVisita(cotizacionId) {
  alert('📅 Aquí conectamos con el formulario de agenda, usando ID: ' + cotizacionId);
  // Redirigir con datos (opcional)
  // window.location.href = `agenda.html?cotizacion_id=${cotizacionId}`;
}

async function verDetalle(cotizacionId) {
  const { data: detalles, error } = await supabase
    .from('cotizaciones_detalle')
    .select('*')
    .eq('cotizacion_id', cotizacionId);

  if (error) {
    console.error('Error al cargar detalles:', error);
    return;
  }

  let detalleHtml = '<ul>';
  for (const item of detalles) {
    detalleHtml += `<li>${item.descripcion} — ${item.cantidad} x $${item.valor_unitario} + IVA ${item.iva_porcentaje || 0}%</li>`;
  }
  detalleHtml += '</ul>';

  alert(`🧾 Detalles:\n\n${detalleHtml.replace(/<[^>]+>/g, '')}`);
}

document.addEventListener('DOMContentLoaded', cargarCotizaciones);
