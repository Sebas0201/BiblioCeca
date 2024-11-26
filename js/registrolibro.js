document.addEventListener("DOMContentLoaded", function () {
  const registerBookForm = document.getElementById("registerBookForm");

  if (registerBookForm) {
    registerBookForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Capturando los datos del formulario
      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const isbn = document.getElementById("isbn").value.trim();
      const publicationYear = document.getElementById("publicationYear").value.trim();
      const editorial = document.getElementById("editorial").value.trim();
      const copies = document.getElementById("copies").value.trim();
      const libraryLocation = document.getElementById("libraryLocation").value.trim();
      const keywords = document.getElementById("keywords").value.trim();
      const summary = document.getElementById("summary").value.trim();
      const imageFile = document.getElementById("bookImage").files[0]; // Imagen del libro

      // Validación de campos
      if (!title || !author || !isbn || !publicationYear || !editorial || !copies || !libraryLocation || !keywords || !summary) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      if (!imageFile) {
        alert("Por favor, carga una imagen para el libro.");
        return;
      }

      // Leer la imagen como Base64
      const reader = new FileReader();
      reader.onload = function () {
        // Crear un nuevo objeto libro
        const newBook = {
          title,
          author,
          isbn,
          publicationYear,
          editorial,
          copies: parseInt(copies, 10),
          libraryLocation,
          keywords,
          summary,
          image: reader.result, // Imagen en formato Base64
        };

        // Guardar en localStorage
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(newBook);
        localStorage.setItem("books", JSON.stringify(books));

        // Mensaje de éxito
        alert("Libro registrado con éxito.");

        // Limpiar el formulario
        registerBookForm.reset();
      };

      // Leer la imagen seleccionada
      reader.readAsDataURL(imageFile);
    });
  } else {
    console.error("No se encontró el formulario con ID 'registerBookForm'.");
  }
});


