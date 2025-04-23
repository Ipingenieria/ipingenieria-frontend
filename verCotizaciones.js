
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
      <button onclick="verDetalle('${c.id}')">👁 Ver Detalle</button>
    `;
    contenedor.appendChild(card);
  }
}

window.verDetalle = async function (cotizacionId) {
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
};

document.addEventListener('DOMContentLoaded', cargarCotizaciones);
