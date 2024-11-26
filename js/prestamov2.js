document.addEventListener("DOMContentLoaded", function () {
  const loanDetailsTableBody = document.querySelector("#loanDetailsTable tbody");

  // Obtener los detalles de todos los préstamos desde localStorage
  const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

  if (borrowedBooks.length === 0) {
    loanDetailsTableBody.innerHTML = "<tr><td colspan='4'>No tienes préstamos registrados.</td></tr>";
    return;
  }

  borrowedBooks.forEach((loan) => {
    const { title, borrowDate, returnDate } = loan;

    // Calcular los días restantes para devolver el libro
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const daysRemaining = Math.floor((returnDateObj - today) / (1000 * 60 * 60 * 24));

    // Crear una fila con la información del préstamo
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${title}</td>
      <td>${borrowDate}</td>
      <td>${returnDate}</td>
      <td>${daysRemaining >= 0 ? daysRemaining : 0} días</td>
    `;

    loanDetailsTableBody.appendChild(row);
  });
});


