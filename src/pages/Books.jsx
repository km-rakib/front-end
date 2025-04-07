import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css"

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3300/books");
      setBooks(res.data);
    } catch (error) {
      setError("Error fetching books: " + error.message);
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3300/books/${id}`);
      // Update local state instead of page reload
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError("Error deleting book: " + err.message);
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to update page with book id
    navigate(`/update/${id}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="books-container">
      <h1>Book Library</h1>
      <div className='books'>
        {books.map((book) => (
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <div className="price">${book.price}</div>
            <div className="button-group">
              <button 
                className='update' 
                onClick={() => handleUpdate(book.id)}
              >
                Update
              </button>
              <button 
                className='delete' 
                onClick={() => handleDelete(book.id)}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add" className="add-book-button">Add New Book</Link>
    </div>
  );
};

export default Books;