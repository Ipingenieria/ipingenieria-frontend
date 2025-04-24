
document.getElementById('formProyecto')?.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    proyecto_id: 'abc', producto_id: 'xyz',
    tipo_movimiento: 'Entrada', tipo_operacion: 'Compra',
    cantidad: 10, valor_unitario: 500, tiene_iva: true,
    porcentaje_iva: 19, requiere_registro_dinero: true,
    tipo_registro_dinero: 'Gasto', subtipo_dinero: 'Producto',
    observaciones: 'Visual profesional', registrado_por: 'admin'
  };
  const { error } = await supabase.from('movimientos_por_proyecto').insert([data]);
  alert(error ? "❌ Error: " + error.message : "✅ Movimiento registrado");
});
