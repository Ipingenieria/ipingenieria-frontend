
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://uyobgstmfukqncebtoli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Cotización] Script cargado correctamente');

  cargarClientes();

  const form = document.getElementById('formCotizacion');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cliente_id = document.getElementById('cliente_id').value;
    const encabezado_tipo = document.getElementById('encabezado_tipo').value;
    const forma_pago = document.getElementById('forma_pago').value;
    const vigencia_dias = parseInt(document.getElementById('vigencia_dias').value);
    const observaciones_generales = document.getElementById('observaciones_generales').value;
    const total_general = parseFloat(document.getElementById('totalGeneral').textContent) || 0;

    console.log('[Cotización] Enviando datos:', { cliente_id, encabezado_tipo, forma_pago, total_general });

    const { data: cotizacion, error: errorCotizacion } = await supabase.from('cotizaciones').insert([{
      cliente_id,
      encabezado_tipo,
      forma_pago,
      vigencia_dias,
      observaciones_generales,
      total: total_general,
      fecha_creacion: new Date().toISOString()
    }]).select().single();

    if (errorCotizacion) {
      console.error('[Cotización] Error al guardar cotización:', errorCotizacion);
      alert('Error al guardar cotización: ' + errorCotizacion.message);
      return;
    }

    const cotizacion_id = cotizacion.id;
    const filas = document.querySelectorAll('#tablaItems tbody tr');

    for (const fila of filas) {
      const descripcion = fila.querySelector('.descripcion').value;
      const unidad = fila.querySelector('.unidad').value;
      const cantidad = parseFloat(fila.querySelector('.cantidad').value) || 0;
      const valor_unitario = parseFloat(fila.querySelector('.valor_unitario').value) || 0;
      const iva = parseFloat(fila.querySelector('.iva').value) || 0;

      const subtotal = cantidad * valor_unitario;
      const total_item = subtotal + (subtotal * iva / 100);

      await supabase.from('cotizaciones_detalle').insert([{
        cotizacion_id,
        descripcion,
        unidad,
        cantidad,
        valor_unitario,
        iva,
        total_item
      }]);
    }

    alert('✅ Cotización guardada exitosamente');
    form.reset();
    document.querySelector('#tablaItems tbody').innerHTML = '';
    document.getElementById('totalGeneral').textContent = '0.00';
  });
});

async function cargarClientes() {
  const { data, error } = await supabase.from('clientes').select('*').order('nombre', { ascending: true });
  const clienteSelect = document.getElementById('cliente_id');
  clienteSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
  if (data) {
    data.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nombre;
      clienteSelect.appendChild(option);
    });
  }
  if (error) console.error('[Clientes] Error al cargar:', error);
}

window.agregarItem = function () {
  const tbody = document.querySelector('#tablaItems tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td><input type="text" class="descripcion" required /></td>
    <td><input type="text" class="unidad" /></td>
    <td><input type="number" class="cantidad" value="1" min="1" onchange="calcularTotales()" /></td>
    <td><input type="number" class="valor_unitario" value="0" min="0" onchange="calcularTotales()" /></td>
    <td><input type="number" class="iva" value="0" min="0" max="100" onchange="calcularTotales()" /></td>
    <td class="total_item">$0.00</td>
    <td><button type="button" onclick="this.parentElement.parentElement.remove(); calcularTotales();">🗑️</button></td>
  `;
  tbody.appendChild(fila);
}

window.calcularTotales = function () {
  let total = 0;
  document.querySelectorAll('#tablaItems tbody tr').forEach(row => {
    const cantidad = parseFloat(row.querySelector('.cantidad').value) || 0;
    const valor = parseFloat(row.querySelector('.valor_unitario').value) || 0;
    const iva = parseFloat(row.querySelector('.iva').value) || 0;
    const subtotal = cantidad * valor;
    const totalItem = subtotal + (subtotal * iva / 100);
    row.querySelector('.total_item').textContent = '$' + totalItem.toFixed(2);
    total += totalItem;
  });
  document.getElementById('totalGeneral').textContent = total.toFixed(2);
}
