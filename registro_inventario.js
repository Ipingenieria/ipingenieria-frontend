
document.getElementById('formInventario')?.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    producto_id: 'abc', tipo_movimiento: 'Entrada',
    cantidad: 5, observaciones: 'Visual profesional', registrado_por: 'admin'
  };
  const { error } = await supabase.from('movimientos_inventario_generales').insert([data]);
  alert(error ? "❌ Error: " + error.message : "✅ Movimiento registrado");
});
