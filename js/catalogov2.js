document.addEventListener("DOMContentLoaded", function () {
  const booksTableBody = document.querySelector("#booksTable tbody");

  // Leer libros del localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];

  if (books.length === 0) {
    booksTableBody.innerHTML = "<tr><td colspan='9'>No hay libros disponibles en el catálogo.</td></tr>";
    return;
  }

  // Mostrar libros en la tabla
  books.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.publicationYear}</td>
      <td>${book.editorial}</td>
      <td>${book.copies}</td>
      <td>${book.libraryLocation}</td>
      <td>${book.keywords}</td>
      <td>
        <img src="${book.image}" alt="Imagen del libro" style="width: 50px; height: auto;">
      </td>
      <td>
        <button class="borrow-btn" onclick="borrowBook(${index})">Prestar</button>
      </td>
    `;

    booksTableBody.appendChild(row);
  });
});

// Función para prestar un libro
function borrowBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const selectedBook = books[index];

  // Verificar si hay copias disponibles
  if (selectedBook.copies > 0) {
    selectedBook.copies -= 1; // Reducir en 1 las copias disponibles

    // Guardar los cambios en el localStorage
    localStorage.setItem("books", JSON.stringify(books));

    // Registrar el préstamo
    const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const borrowDate = new Date().toISOString().split("T")[0]; // Fecha de préstamo
    const returnDate = calculateReturnDate(7); // Fecha de devolución (7 días después)

    borrowedBooks.push({
      title: selectedBook.title,
      borrowDate: borrowDate,
      returnDate: returnDate,
    });
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Alerta de préstamo y redirección a la página de detalles del préstamo
    alert(`Has prestado el libro: "${selectedBook.title}". Recuerda devolverlo antes de la fecha: ${returnDate}`);
    

// Función para calcular la fecha de devolución
function calculateReturnDate(days) {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today.toISOString().split("T")[0];
}
}
}
