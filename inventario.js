
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://uyobgstmfukqncebtoli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo'
);

const formulario = document.getElementById("formulario-inventario");
const lista = document.getElementById("lista-productos");
const selectProyecto = document.getElementById("proyecto_id");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nuevo = {
    nombre: formulario.nombre.value,
    categoria: formulario.categoria.value,
    unidad: formulario.unidad.value,
    cantidad: parseInt(formulario.cantidad.value),
    valor_compra: parseFloat(formulario.valor_compra.value),
    valor_venta: parseFloat(formulario.valor_venta.value),
    proyecto_id: formulario.proyecto_id.value || null,
    imagen_url: formulario.imagen_url.value || null,
  };

  const { error } = await supabase.from("inventario").insert(nuevo);
  if (error) return alert("Error al guardar el producto");
  alert("Producto guardado correctamente");
  formulario.reset();
  cargarProductos();
});

async function cargarProductos() {
  const { data, error } = await supabase.from("inventario").select("*");
  lista.innerHTML = "";
  if (error) return alert("Error cargando productos");

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <strong>${p.nombre}</strong><br/>
      Categoría: ${p.categoria} | Unidad: ${p.unidad}<br/>
      Cantidad: ${p.cantidad} | Compra: $${p.valor_compra} | Venta: $${p.valor_venta}<br/>
      ${p.imagen_url ? `<img src="${p.imagen_url}" alt="imagen" />` : ""}
    `;
    lista.appendChild(div);
  });
}

async function cargarProyectos() {
  const { data, error } = await supabase.from("proyectos").select("id, nombre");
  if (!error && data) {
    data.forEach(p => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = p.nombre;
      selectProyecto.appendChild(option);
    });
  }
}

cargarProyectos();
cargarProductos();
