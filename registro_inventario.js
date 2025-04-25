
document.getElementById("formInventario").addEventListener("submit", async function(e) {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    categoria: document.getElementById("categoria").value,
    cantidad: parseFloat(document.getElementById("cantidad").value),
    unidad_medida: document.getElementById("unidad_medida").value,
    imagen_url: document.getElementById("imagen_url").value || null,
    observaciones: document.getElementById("observaciones").value
  };

  const { error } = await supabase
    .from("inventario")
    .insert([producto]);

  if (error) {
    alert("❌ Error al guardar producto: " + error.message);
  } else {
    alert("✅ Producto registrado correctamente.");
    document.getElementById("formInventario").reset();
  }
});
