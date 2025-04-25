// registro_inventario.js

async function guardarProducto() {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;

  const { data, error } = await supabase
    .from('productos')
    .insert([
      {
        nombre: nombre,
        descripcion: descripcion,
        categoria: categoria
      }
    ]);

  if (error) {
    alert("❌ Error creando producto: " + error.message);
    console.error("Error al insertar:", error);
  } else {
    alert("✅ Producto guardado correctamente");
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("modalNuevoProducto").style.display = "none";
  }
}
