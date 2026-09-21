import { useEffect, useState } from "react";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load books");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      isbn: "",
      quantity: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        quantity: Number(form.quantity),
      };

      if (editingId) {
        await api.put(`/books/${editingId}`, data);
        alert("Book updated successfully");
      } else {
        await api.post("/books", data);
        alert("Book added successfully");
      }

      resetForm();
      loadBooks();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const editBook = (book) => {
    setEditingId(book.id);

    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      quantity: book.quantity,
    });
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      loadBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Books</h1>
          <p>Manage library books</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="form-card">
          <h2>{editingId ? "Edit Book" : "Add Book"}</h2>

          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />

            <label>Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author"
              required
            />

            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="0"
              placeholder="Enter quantity"
              required
            />

            <button className="btn primary" type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h2>Book List</h2>
            <span>{books.length} books</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">
                      No books found
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <span className="quantity">
                          {book.quantity}
                        </span>
                      </td>
                      <td>
                        <button
                          className="action edit"
                          onClick={() => editBook(book)}
                        >
                          Edit
                        </button>

                        <button
                          className="action delete"
                          onClick={() => deleteBook(book.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
