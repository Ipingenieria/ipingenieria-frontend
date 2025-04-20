// Protección de ruta
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  localStorage.setItem("redirigir_a", window.location.pathname.replace('/', ''));
  window.location.href = "login.html";
}

// Función de cierre
function cerrarSesion() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}