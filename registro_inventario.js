
const supabase = window.supabase.createClient(URL, KEY);
document.getElementById('formInventario').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    producto_id: document.getElementById('producto_id').value,
    tipo_movimiento: document.getElementById('tipo_movimiento').value,
    cantidad: parseFloat(document.getElementById('cantidad').value),
    observaciones: document.getElementById('observaciones').value,
    registrado_por: document.getElementById('registrado_por').value
  };
  const { error } = await supabase.from('movimientos_inventario_generales').insert([data]);
  alert(error ? "Error: " + error.message : "✅ Movimiento registrado");
});
