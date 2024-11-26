// login.js
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
        // Obtener los valores del formulario
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        // Verificar si ambos campos están llenos
        if (!email || !password) {
          alert("Por favor, ingresa tu correo y contraseña.");
          return;
        }
  
        // Obtener los usuarios del localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Buscar el usuario con el correo y la contraseña proporcionados
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
  
        if (user) {
          // Redirigir según el tipo de usuario
          if (user.userType === "Administrador") {
            window.location.href = "admin.html"; // Página para administradores
          } else {
            window.location.href = "otros.html"; // Página para otros usuarios
          }
        } else {
          alert("Correo o contraseña incorrectos.");
        }
      });
    } else {
      console.error("No se encontró el formulario con ID 'loginForm'.");
    }
  });
  



