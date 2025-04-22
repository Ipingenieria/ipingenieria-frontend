
const supabase = supabase.createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

document.addEventListener("DOMContentLoaded", async () => {
  const { data, error } = await supabase.from("clientes").select("id, nombre");

  if (error) {
    console.error("❌ Error al cargar clientes:", error);
    alert("Error al cargar la lista de clientes.");
    return;
  }

  const select = document.getElementById("cliente_id");
  data.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nombre;
    select.appendChild(option);
  });
});
