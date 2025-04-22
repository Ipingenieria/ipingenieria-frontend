import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase
const supabaseUrl = 'https://uyobgstmfukqncebtoli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Al cargar, llenar lista de clientes
document.addEventListener('DOMContentLoaded', async () => {
  const { data: clientes } = await supabase.from('clientes').select('*');
  const select = document.getElementById('cliente_id');
  clientes.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    select.appendChild(option);
  });

  document.getElementById('btn-agregar-item').addEventListener('click', agregarItem);
  document.getElementById('formulario-cotizacion').addEventListener('submit', guardarCotizacion);
});

// Agregar ítem al DOM
function agregarItem() {
  const contenedor = document.getElementById('contenedor-items');
  const itemHTML = `
    <div class="row mb-2 item">
      <div class="col-md-2"><input type="number" class="form-control cantidad" placeholder="Cantidad" required></div>
      <div class="col-md-2"><input type="text" class="form-control unidad" placeholder="Unidad" required></div>
      <div class="col-md-3"><input type="text" class="form-control descripcion" placeholder="Descripción" required></div>
      <div class="col-md-2"><input type="number" class="form-control valor_unitario" placeholder="Valor Unitario" required></div>
      <div class="col-md-1"><input type="number" class="form-control iva_porcentaje" placeholder="IVA %" required></div>
      <div class="col-md-2"><input type="number" class="form-control valor_total_item" placeholder="Total $" readonly></div>
    </div>`;
  contenedor.insertAdjacentHTML('beforeend', itemHTML);
}

// Guardar cotización
async function guardarCotizacion(e) {
  e.preventDefault();

  const cliente_id = document.getElementById('cliente_id').value;
  const encabezado_tipo = document.getElementById('encabezado_tipo').value;
  const forma_pago = document.getElementById('forma_pago').value;
  const items = Array.from(document.querySelectorAll('.item'));

  let total_general = 0;
  const detalles = [];

  items.forEach(item => {
    const cantidad = parseFloat(item.querySelector('.cantidad').value) || 0;
    const unidad = item.querySelector('.unidad').value;
    const descripcion = item.querySelector('.descripcion').value;
    const valor_unitario = parseFloat(item.querySelector('.valor_unitario').value) || 0;
    const iva_porcentaje = parseFloat(item.querySelector('.iva_porcentaje').value) || 0;

    const valor_total_item = Math.round(cantidad * valor_unitario * (1 + iva_porcentaje / 100));
    item.querySelector('.valor_total_item').value = valor_total_item;
    total_general += valor_total_item;

    detalles.push({
      cantidad,
      unidad,
      descripcion,
      valor_unitario,
      iva_porcentaje,
      valor_total_item,
    });
  });

  document.getElementById('valor_total').value = total_general;

  // Crear cotización principal
  const { data: cotizacion, error } = await supabase.from('cotizaciones').insert([{
    cliente_id,
    encabezado_tipo,
    forma_pago,
    valor_total: total_general
  }]).select().single();

  if (error) {
    console.error('Error creando cotización:', error);
    alert('❌ Error al guardar la cotización.');
    return;
  }

  // Insertar detalle
  const detalleData = detalles.map(d => ({
    ...d,
    cotizacion_id: cotizacion.id
  }));

  const { error: errorDetalle } = await supabase.from('cotizaciones_detalle').insert(detalleData);
  if (errorDetalle) {
    console.error('Error guardando detalle:', errorDetalle);
    alert('❌ Cotización creada, pero error en los ítems.');
    return;
  }

  alert('✅ Cotización guardada exitosamente.');
  window.location.reload();
}
