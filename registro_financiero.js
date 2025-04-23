
const supabase = window.supabase.createClient(URL, KEY);
document.getElementById('formFinanciero').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    tipo: document.getElementById('tipo').value,
    categoria: document.getElementById('categoria').value,
    descripcion: document.getElementById('descripcion').value,
    valor: parseFloat(document.getElementById('valor').value),
    observaciones: document.getElementById('observaciones').value,
    registrado_por: document.getElementById('registrado_por').value
  };
  const { error } = await supabase.from('movimientos_financieros').insert([data]);
  alert(error ? "Error: " + error.message : "✅ Registrado correctamente");
});
