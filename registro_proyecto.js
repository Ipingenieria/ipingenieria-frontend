
const supabase = window.supabase.createClient(URL, KEY);
document.getElementById('formProyecto').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    proyecto_id: document.getElementById('proyecto_id').value,
    producto_id: document.getElementById('producto_id').value,
    tipo_movimiento: document.getElementById('tipo_movimiento').value,
    tipo_operacion: document.getElementById('tipo_operacion').value,
    cantidad: parseFloat(document.getElementById('cantidad').value),
    valor_unitario: parseFloat(document.getElementById('valor_unitario').value),
    tiene_iva: document.getElementById('tiene_iva').value === 'true',
    porcentaje_iva: parseFloat(document.getElementById('porcentaje_iva').value),
    requiere_registro_dinero: document.getElementById('requiere_registro_dinero').value === 'true',
    tipo_registro_dinero: document.getElementById('tipo_registro_dinero').value,
    subtipo_dinero: document.getElementById('subtipo_dinero').value,
    observaciones: document.getElementById('observaciones').value,
    registrado_por: document.getElementById('registrado_por').value
  };
  const { error } = await supabase.from('movimientos_por_proyecto').insert([data]);
  alert(error ? "Error: " + error.message : "✅ Movimiento registrado");
});
