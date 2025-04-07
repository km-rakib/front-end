import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Add = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3300/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <h1>Add</h1>
      <div className='form'>
        <h3>Add New Book</h3>
        <input type="text" placeholder='Title' name='title' onChange={handleChange} />
        <input type="text" placeholder='Description' name='description' onChange={handleChange} />
        <input type="text" placeholder='Cover' name='cover' onChange={handleChange} />
        <input type="text" placeholder='Price' name='price' onChange={handleChange} />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default Add;