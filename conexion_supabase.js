
// conexion_supabase.js corregido

if (typeof supabase !== 'undefined') {
    const SUPABASE_URL = 'https://uyobgstmfukqncebtoli.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5b2Jnc3RtZnVrcW5jZWJ0b2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODEyOTMsImV4cCI6MjA2MDc1NzI5M30.gf06WtYzOlB5oSFP-NSYlSsZS2I71Zl6_h6nLBdWKMo';

    var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error('❌ Error: La librería Supabase no ha sido cargada antes de intentar crear la conexión.');
}
