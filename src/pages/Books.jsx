import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../style.css"


const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3300/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:3300/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  // const handleUpdate = (id) => {
  //   const q = "UPDATE books SET title = ?, description = ?, cover = ?, price = ? WHERE id = ?";
  //   axios.put(`http://localhost:3300/books/${id}`, {title, description, cover, price});
  // }

  return (
    <div className="books-container">
      <h1>Book Library</h1>
      <div className='books'>
        {books.map((book) => (
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <div className="price">{book.price}</div>
            <div className="button-group">
              <button className='update'>Update</button>
              <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add" className="add-book-button">Add New Book</Link>
    </div>
  );
};

export default Books;