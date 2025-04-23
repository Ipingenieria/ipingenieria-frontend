
document.getElementById("formulario-inventario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const supabaseUrl = 'https://uyobgstmfukqncebtoli.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  const client = supabase.createClient(supabaseUrl, supabaseKey);

  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const valor_unitario = parseFloat(document.getElementById("valor_unitario").value);
  const archivoImagen = document.getElementById("imagen").files[0];

  let imagen_url = "";

  if (archivoImagen) {
    const nombreArchivo = `${Date.now()}_${archivoImagen.name}`;
    const { data: storageData, error: storageError } = await client.storage
      .from("imagenes")
      .upload(nombreArchivo, archivoImagen);

    if (storageError) {
      console.error("Error subiendo imagen:", storageError.message);
      alert("Error al subir la imagen.");
      return;
    }

    const { data: publicUrlData } = client.storage.from("imagenes").getPublicUrl(nombreArchivo);
    imagen_url = publicUrlData.publicUrl;
  }

  const { data, error } = await client.from("inventario").insert([{
    nombre,
    categoria,
    cantidad,
    valor_unitario,
    imagen_url
  }]);

  if (error) {
    console.error("Error al registrar producto:", error.message);
    alert("Error al registrar el producto.");
  } else {
    alert("Producto registrado con éxito.");
    document.getElementById("formulario-inventario").reset();
  }
});
