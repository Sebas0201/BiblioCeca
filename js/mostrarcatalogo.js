document.addEventListener("DOMContentLoaded", function () {
  const booksTable = document.getElementById("booksTable").querySelector("tbody");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const filter = document.getElementById("filter");

  // Cargar y mostrar los libros al abrir la página
  function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    booksTable.innerHTML = ""; // Limpiar la tabla

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
          <img src="${book.image || 'placeholder.jpg'}" alt="Imagen del libro" width="50" height="50">
        </td>
        <td>
          <button class="read-btn" data-index="${index}">Leer</button>
          <button class="update-btn" data-index="${index}">Actualizar</button>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      booksTable.appendChild(row);
    });

    addEventListenersToButtons(); // Agregar eventos a los botones
  }

  // Función para buscar libros
  function searchBooks() {
    const query = searchInput.value.trim().toLowerCase();
    const filterBy = filter.value;
    const books = JSON.parse(localStorage.getItem("books")) || [];
    booksTable.innerHTML = ""; // Limpiar la tabla

    const filteredBooks = books.filter((book) => {
      if (filterBy === "all") {
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.isbn.toLowerCase().includes(query)
        );
      } else if (filterBy === "title") {
        return book.title.toLowerCase().includes(query);
      } else if (filterBy === "author") {
        return book.author.toLowerCase().includes(query);
      } else if (filterBy === "isbn") {
        return book.isbn.toLowerCase().includes(query);
      }
      return false;
    });

    // Mostrar libros filtrados
    filteredBooks.forEach((book, index) => {
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
          <img src="${book.image || 'placeholder.jpg'}" alt="Imagen del libro" width="50" height="50">
        </td>
        <td>
          <button class="read-btn" data-index="${index}">Leer</button>
          <button class="update-btn" data-index="${index}">Actualizar</button>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      booksTable.appendChild(row);
    });

    if (filteredBooks.length === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="10">No se encontraron libros.</td>`;
      booksTable.appendChild(noDataRow);
    }

    addEventListenersToButtons(); // Agregar eventos a los nuevos botones
  }

  // Función para leer un libro
  function readBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books[index];

    if (book) {
      alert(`
        Detalles del libro:
        Título: ${book.title}
        Autor: ${book.author}
        ISBN: ${book.isbn}
        Año de Publicación: ${book.publicationYear}
        Editorial: ${book.editorial}
        Copias: ${book.copies}
        Ubicación: ${book.libraryLocation}
        Palabras clave: ${book.keywords}
        Imagen: ${book.image ? "Sí" : "No"}
      `);
    } else {
      alert("Libro no encontrado.");
    }
  }

  // Función para actualizar un libro
  function updateBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books[index];

    if (book) {
      const newTitle = prompt("Nuevo título:", book.title);
      const newAuthor = prompt("Nuevo autor:", book.author);
      const newISBN = prompt("Nuevo ISBN:", book.isbn);
      const newPublicationYear = prompt("Nuevo año de publicación:", book.publicationYear);
      const newEditorial = prompt("Nueva editorial:", book.editorial);
      const newCopies = prompt("Nuevas copias:", book.copies);
      const newLibraryLocation = prompt("Nueva ubicación:", book.libraryLocation);
      const newKeywords = prompt("Nuevas palabras clave:", book.keywords);
      const newImage = prompt("Nueva URL de la imagen:", book.image);

      books[index] = {
        ...book,
        title: newTitle || book.title,
        author: newAuthor || book.author,
        isbn: newISBN || book.isbn,
        publicationYear: newPublicationYear || book.publicationYear,
        editorial: newEditorial || book.editorial,
        copies: newCopies || book.copies,
        libraryLocation: newLibraryLocation || book.libraryLocation,
        keywords: newKeywords || book.keywords,
        image: newImage || book.image,
      };

      localStorage.setItem("books", JSON.stringify(books));
      alert("Libro actualizado correctamente.");
      loadBooks(); // Recargar la tabla
    } else {
      alert("Libro no encontrado.");
    }
  }

  // Función para eliminar un libro
  function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      books.splice(index, 1); // Eliminar el libro
      localStorage.setItem("books", JSON.stringify(books));
      alert("Libro eliminado correctamente.");
      loadBooks(); // Recargar la tabla
    }
  }

  // Agregar eventos a los botones de la tabla
  function addEventListenersToButtons() {
    const readButtons = document.querySelectorAll(".read-btn");
    const updateButtons = document.querySelectorAll(".update-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    readButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        readBook(index);
      });
    });

    updateButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        updateBook(index);
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deleteBook(index);
      });
    });
  }

  // Cargar libros al inicio
  loadBooks();

  // Buscar al hacer clic
  searchButton.addEventListener("click", searchBooks);
});

