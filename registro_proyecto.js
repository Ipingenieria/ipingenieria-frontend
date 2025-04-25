
const supabaseUrl = "https://uyobgstmfukqncebtoli.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Cargar listas
window.addEventListener("DOMContentLoaded", async () => {
    const clientesSelect = document.getElementById("cliente_id");
    const responsablesSelect = document.getElementById("responsable");

    const { data: clientes } = await supabase.from("clientes").select("id,nombre");
    clientesSelect.innerHTML = clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");

    const { data: usuarios } = await supabase.from("usuarios").select("id,nombre").eq("rol", "tecnico");
    responsablesSelect.innerHTML = usuarios.map(u => `<option value="${u.id}">${u.nombre}</option>`).join("");
});

// Envío
document.getElementById("formProyecto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombre").value,
        cliente_id: document.getElementById("cliente_id").value,
        fecha_inicio: document.getElementById("fecha_inicio").value,
        fecha_fin: document.getElementById("fecha_fin").value,
        estado: document.getElementById("estado").value,
        responsable: document.getElementById("responsable").value,
        servicios: document.getElementById("servicios").value,
        valor_total: parseFloat(document.getElementById("valor_total").value),
        observaciones: document.getElementById("observaciones").value
    };
    const { error } = await supabase.from("proyectos").insert([datos]);
    if (error) {
        alert("❌ Error al registrar: " + error.message);
    } else {
        alert("✅ Proyecto registrado correctamente.");
        document.getElementById("formProyecto").reset();
    }
});
