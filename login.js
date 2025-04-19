// Esta es una estructura de ejemplo para el login. En la versión real, usarás una librería Supabase.

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const mensaje = document.getElementById('mensaje');

  // Simulación: solo acepta estos usuarios
  const users = {
    "admin@ipingenieria.com": "Admin2025*",
    "secretaria@ipingenieria.com": "Secret2025*",
    "tecnico@ipingenieria.com": "Tecnico2025*"
  };

  if (users[email] && users[email] === password) {
    localStorage.setItem("user", JSON.stringify({ email }));
    mensaje.textContent = "Bienvenido. Redirigiendo...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    mensaje.textContent = "Usuario o contraseña incorrecta.";
  }
});