// Supabase connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

export async function cargarAgenda() {
  const { data: agenda, error: errorAgenda } = await supabase.from("agenda").select("*");
  const { data: clientes, error: errorClientes } = await supabase.from("clientes").select("id,nombre,direccion");

  if (errorAgenda || errorClientes) {
    console.error("❌ Error cargando datos:", errorAgenda || errorClientes);
    return;
  }

  const tabla = document.getElementById("tabla-agenda");
  tabla.innerHTML = "";

  agenda.forEach(registro => {
    const cliente = clientes.find(c => c.id === registro.cliente_id);
    const fila = document.createElement("tr");
    const clase = (registro.prioridad || "media").toLowerCase();
    const estado = registro.realizada ? "✅ Realizada" : "⏳ Pendiente";

    fila.classList.add(clase);

    fila.innerHTML = `
      <td>${cliente?.nombre || "Desconocido"}</td>
      <td>${cliente?.direccion || "-"}</td>
      <td>${registro.fecha}</td>
      <td>${registro.hora}</td>
      <td>${registro.servicio}</td>
      <td>${registro.tecnico_asignado || "-"}</td>
      <td>${registro.observaciones || "-"}</td>
      <td class="${registro.realizada ? 'realizada' : 'pendiente'}">${estado}</td>
      <td>${registro.prioridad || 'Media'}</td>
      <td>${!registro.realizada ? `<button onclick="confirmarVisita('${registro.id}')">Confirmar</button>` : ''}</td>
    `;
    tabla.appendChild(fila);
  });
}

export async function confirmarVisita(id) {
  const confirmar = confirm("¿Confirmas que esta visita fue realizada?");
  if (!confirmar) return;

  const res = await supabase.from("agenda").update({ realizada: true }).eq("id", id);

  if (res.error) {
    alert("❌ Error al confirmar visita.");
  } else {
    alert("✅ Visita confirmada.");
    cargarAgenda();
  }
}

window.onload = cargarAgenda;
