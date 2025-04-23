
const supabase = window.supabase.createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

// Cargar productos desde Supabase
async function cargarProductos() {
  const { data, error } = await supabase.from('productos').select('id, nombre');

  const select = document.getElementById('producto_id');
  select.innerHTML = '<option value="">Selecciona un producto</option>';

  if (error) {
    console.error("Error cargando productos:", error);
    alert("No se pudieron cargar los productos.");
    return;
  }

  data.forEach(producto => {
    const option = document.createElement('option');
    option.value = producto.id;
    option.textContent = producto.nombre;
    select.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', cargarProductos);

// Enviar movimiento
document.getElementById('formMovimiento').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    producto_id: document.getElementById('producto_id').value,
    tipo_movimiento: document.getElementById('tipo_movimiento').value,
    tipo_operacion: document.getElementById('tipo_operacion').value,
    cantidad: parseInt(document.getElementById('cantidad').value),
    valor_unitario: parseFloat(document.getElementById('valor_unitario').value),
    tiene_iva: document.getElementById('tiene_iva').value === 'true',
    porcentaje_iva: parseFloat(document.getElementById('porcentaje_iva').value) || 0,
    requiere_registro_dinero: document.getElementById('requiere_registro_dinero').value === 'true',
    tipo_registro_dinero: document.getElementById('tipo_registro_dinero').value || null,
    subtipo_dinero: document.getElementById('subtipo_dinero').value || null,
    vinculado_a: document.getElementById('vinculado_a').value || null,
    referencia_relacionada: document.getElementById('referencia_relacionada').value || null,
    observaciones: document.getElementById('observaciones').value,
    registrado_por: document.getElementById('registrado_por').value
  };

  const { error } = await supabase.from('registro_movimientos').insert([data]);

  if (error) {
    alert("❌ Error al guardar el movimiento: " + error.message);
    console.error(error);
  } else {
    alert("✅ Movimiento registrado correctamente");
    document.getElementById('formMovimiento').reset();
  }
});
