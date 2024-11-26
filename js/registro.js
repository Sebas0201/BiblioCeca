// script.js
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
  
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
        // Obtener los valores de los campos del formulario
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const idNumber = document.getElementById("idNumber").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const address = document.getElementById("address").value.trim();
        const userType = document.getElementById("userType").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        // Validación de los campos
        if (!firstName || !lastName || !idNumber || !phone || !dob || !address || !userType || !email || !password) {
          alert("Por favor, llena todos los campos.");
          return;
        }
  
        // Validar si el correo ya está registrado
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser = users.find((user) => user.email === email);
  
        if (existingUser) {
          alert("Este correo electrónico ya está registrado.");
          return;
        }
  
        // Crear el objeto de nuevo usuario
        const newUser = {
          firstName,
          lastName,
          idNumber,
          phone,
          dob,
          address,
          userType,
          email,
          password,
        };
  
        // Guardar el nuevo usuario en localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
  
        // Mensaje de éxito
        alert("Usuario registrado con éxito.");
  
        // Redirigir según el tipo de usuario
        if (userType === "Administrador") {
          window.location.href = "admin.html"; // Reemplaza con la URL de la página de administrador
        } else {
          window.location.href = "otros.html"; // Reemplaza con la URL de la página de usuarios
        }
      });
    } else {
      console.error("No se encontró el formulario con ID 'registerForm'.");
    }
  });
  
