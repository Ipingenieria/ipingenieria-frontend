
// Configuración de Supabase
const supabaseUrl = "https://uyobgstmfukqncebtoli.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {
  cargarClientes();
});

async function cargarClientes() {
  console.log("🔄 Cargando clientes desde Supabase...");
  const { data, error } = await supabase.from("clientes").select("id, nombre");

  if (error) {
    console.error("❌ Error al cargar clientes:", error);
    alert("Error al cargar clientes. Ver consola.");
    return;
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ No se encontraron clientes en la base de datos.");
    alert("No hay clientes registrados.");
    return;
  }

  const select = document.getElementById("cliente_id");
  if (!select) {
    console.error("❌ No se encontró el select con id='cliente_id'");
    return;
  }

  data.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    select.appendChild(option);
  });

  console.log("✅ Clientes cargados correctamente:", data);
}

// Guardado de cotización (igual al anterior, omitido por ahora)
