
document.getElementById('formFinanciero')?.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    tipo: 'Ingreso', categoria: 'Test', descripcion: 'Desde profesional',
    valor: 1000, observaciones: 'Visual profesional', registrado_por: 'admin'
  };
  const { error } = await supabase.from('movimientos_financieros').insert([data]);
  alert(error ? "❌ Error: " + error.message : "✅ Registrado correctamente");
});
