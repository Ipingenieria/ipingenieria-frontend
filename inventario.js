
// Requiere incluir Supabase en tu HTML antes de este script

const form = document.getElementById('formInventario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const referencia = document.getElementById('referencia').value;
  const categoria = document.getElementById('categoria').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const valor_unitario = parseFloat(document.getElementById('valor_unitario').value);
  const tiene_iva = document.getElementById('tiene_iva').value === 'true';
  const porcentaje_iva = parseFloat(document.getElementById('porcentaje_iva').value || 0);
  const tipo_movimiento = document.getElementById('tipo_movimiento').value;
  const observaciones = document.getElementById('observaciones').value;

  const imagenInput = document.getElementById('imagen');
  let imagen_url = "";

  if (imagenInput.files.length > 0) {
    const file = imagenInput.files[0];
    const { data, error } = await supabase.storage.from('imagenes').upload(`inventario/${Date.now()}_${file.name}`, file);
    if (error) {
      alert("Error al subir imagen: " + error.message);
      return;
    }
    imagen_url = supabase.storage.from('imagenes').getPublicUrl(data.path).publicUrl;
  }

  const { data, error } = await supabase.from('inventario').insert([{
    nombre, referencia, categoria, cantidad, valor_unitario,
    tiene_iva, porcentaje_iva, tipo_movimiento, observaciones, imagen_url
  }]);

  if (error) {
    alert("Error al guardar: " + error.message);
  } else {
    alert("Producto guardado correctamente");
    form.reset();
  }
});
