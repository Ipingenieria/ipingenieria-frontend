
// guardarCotizacion.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://uyobgstmfukqncebtoli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo';
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('formCotizacion');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cliente_id = document.getElementById('cliente_id').value;
  const encabezado_tipo = document.getElementById('encabezado_tipo').value;
  const forma_pago = document.getElementById('forma_pago').value;
  const vigencia_dias = parseInt(document.getElementById('vigencia_dias').value);
  const observaciones_generales = document.getElementById('observaciones_generales').value;

  const { data: cotizacion, error: errorCotizacion } = await supabase.from('cotizaciones').insert([{
    cliente_id,
    encabezado_tipo,
    forma_pago,
    vigencia_dias,
    observaciones_generales,
    fecha_creacion: new Date().toISOString()
  }]).select().single();

  if (errorCotizacion) {
    alert('Error al guardar cotización: ' + errorCotizacion.message);
    return;
  }

  const cotizacion_id = cotizacion.id;
  const filas = document.querySelectorAll('#tablaItems tbody tr');

  for (const fila of filas) {
    const descripcion = fila.querySelector('.descripcion').value;
    const unidad = fila.querySelector('.unidad').value;
    const cantidad = parseFloat(fila.querySelector('.cantidad').value) || 0;
    const valor_unitario = parseFloat(fila.querySelector('.valor_unitario').value) || 0;
    const iva = parseFloat(fila.querySelector('.iva').value) || 0;

    let imagen_url = null;
    const fileInput = fila.querySelector('.imagen');
    const archivo = fileInput?.files?.[0];

    if (archivo) {
      const nombreUnico = `img_${Date.now()}_${archivo.name}`;
      const { data: imgData, error: imgError } = await supabase.storage
        .from('imagenes')
        .upload(nombreUnico, archivo);

      if (!imgError) {
        const { data: urlData } = supabase.storage
          .from('imagenes')
          .getPublicUrl(nombreUnico);
        imagen_url = urlData.publicUrl;
      }
    }

    await supabase.from('items_cotizacion').insert([{
      cotizacion_id,
      descripcion,
      unidad,
      cantidad,
      valor_unitario,
      iva,
      imagen_url
    }]);
  }

  alert('Cotización guardada exitosamente');
  form.reset();
  document.querySelector('#tablaItems tbody').innerHTML = '';
  document.getElementById('totalGeneral').textContent = '0.00';
});
