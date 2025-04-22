
// Configuración de Supabase
const supabaseUrl = "https://uyobgstmfukqncebtoli.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cargar clientes en lista desplegable
async function cargarClientes() {
  const { data, error } = await supabase.from("clientes").select("id, nombre");
  if (error) {
    console.error("Error al cargar clientes:", error);
    return;
  }
  const select = document.getElementById("cliente_id");
  data.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    select.appendChild(option);
  });
}

// Guardar cotización en Supabase
document.getElementById("formCotizacion").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cliente_id = document.getElementById("cliente_id").value;
  const encabezado_tipo = document.getElementById("encabezado_tipo").value;
  const forma_pago = document.getElementById("forma_pago").value;
  const vigencia_dias = document.getElementById("vigencia_dias").value;
  const observaciones_generales = document.getElementById("observaciones_generales").value;
  const valor_total = parseFloat(document.getElementById("totalGeneral").textContent);

  const { data: cotizacion, error } = await supabase.from("cotizaciones").insert([{
    cliente_id, encabezado_tipo, forma_pago,
    vigencia_dias: parseInt(vigencia_dias), observaciones_generales,
    valor_total, valor_letras: "", creado_por: "admin"
  }]).select().single();

  if (error) {
    console.error("Error al guardar cotización:", error);
    alert("❌ Error al guardar la cotización");
    return;
  }

  const cotizacion_id = cotizacion.id;
  const filas = document.querySelectorAll("#tablaItems tbody tr");

  for (const fila of filas) {
    const descripcion = fila.querySelector(".descripcion").value;
    const unidad_medida = fila.querySelector(".unidad").value;
    const cantidad = parseFloat(fila.querySelector(".cantidad").value) || 0;
    const valor_unitario = parseFloat(fila.querySelector(".valor_unitario").value) || 0;
    const iva_porcentaje = parseFloat(fila.querySelector(".iva").value) || 0;
    const subtotal = cantidad * valor_unitario;
    const valor_total_item = subtotal + (subtotal * iva_porcentaje / 100);

    const { error: errorItem } = await supabase.from("cotizaciones_detalle").insert([{
      cotizacion_id,
      descripcion,
      unidad_medida,
      cantidad,
      valor_unitario,
      iva_porcentaje,
      valor_total_item,
      tipo_item: "personalizado"
    }]);

    if (errorItem) {
      console.error("Error al guardar ítem:", errorItem);
    }
  }

  alert("✅ Cotización guardada correctamente");
  location.reload();
});

cargarClientes();
