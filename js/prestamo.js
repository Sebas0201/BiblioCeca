document.addEventListener("DOMContentLoaded", function () {
  const loanTableBody = document.querySelector("#loanTable tbody");

  // Leer los préstamos desde localStorage
  const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || []; // Obtener la lista de usuarios
  const role = localStorage.getItem("role"); // El rol del usuario actual (admin, estudiante, etc.)

  // Verificar si hay préstamos
  if (borrowedBooks.length === 0) {
    loanTableBody.innerHTML = "<tr><td colspan='5'>No hay préstamos registrados.</td></tr>";
    return;
  }

  borrowedBooks.forEach((loan) => {
    const { title, borrowDate, returnDate, userId } = loan;

    // Calcular los días restantes para devolver el libro
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const daysRemaining = Math.floor((returnDateObj - today) / (1000 * 60 * 60 * 24));

    // Crear una fila con la información del préstamo
    const row = document.createElement("tr");
    
    // Si el rol no es administrador, mostrar el nombre y el ID del usuario que prestó el libro
    let borrowerInfo = "";
    if (role !== "administrador") {
      // Buscar el usuario correspondiente al borrower (por ID)
      const user = users.find(user => user.userId === userId);
      if (user) {
        borrowerInfo = `${user.firstName} ${user.lastName} (ID: ${user.userId}, Rol: ${user.role})`;  // Mostrar nombre, ID y rol del usuario
      }
    }

    row.innerHTML = `
      <td>${title}</td>
      <td>${borrowDate}</td>
      <td>${returnDate}</td>
      <td>${daysRemaining >= 0 ? daysRemaining : 0} días</td>
      <td>${borrowerInfo}</td> <!-- Mostrar el nombre, ID y rol del usuario si no es administrador -->
    `;

    loanTableBody.appendChild(row);
  });
});
