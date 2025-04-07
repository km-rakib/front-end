import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: '',
    price: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Error fetching book details: " + err.message);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3300/books/${id}`, book);
      navigate('/');
    } catch (err) {
      setError("Error updating book: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="form-container">
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cover"
          placeholder="Cover URL"
          value={book.cover}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default Update;