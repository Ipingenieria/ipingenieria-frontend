
document.getElementById("formFinanciero").addEventListener("submit", async function(e) {
  e.preventDefault();

  const movimiento = {
    tipo_movimiento: document.getElementById("tipo_movimiento").value,
    categoria: document.getElementById("categoria").value,
    valor: parseFloat(document.getElementById("valor").value),
    fecha: document.getElementById("fecha").value,
    usuario: document.getElementById("usuario").value,
    descripcion: document.getElementById("descripcion").value,
    tipo_pago: document.getElementById("tipo_pago").value,
    estado_pago: document.getElementById("estado_pago").value
  };

  const { error } = await supabase
    .from("registro_financiero")
    .insert([movimiento]);

  if (error) {
    alert("❌ Error al registrar movimiento financiero: " + error.message);
  } else {
    alert("✅ Movimiento registrado correctamente.");
    document.getElementById("formFinanciero").reset();
  }
});
