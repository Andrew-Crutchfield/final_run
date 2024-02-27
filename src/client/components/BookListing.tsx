import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET, POST, DELETE, PUT } from '../services/fetcher'; 

interface Book {
  id: number;
  title: string;
  author: string;
  price?: number; 
}

const BookListing: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await GET<{ books: Book[] }>('/api/books');
      setBooks(response.books); 
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 

  const handleAddBook = async () => {
    try {
      const bookData = {
        title: newBook.title,
        author: newBook.author,
        price: newBook.price ? parseFloat(newBook.price) : undefined,
        categoryid: 1, 
      };
      await POST<Book>('/api/books', bookData);
      setNewBook({ title: '', author: '', price: '' }); 
      await fetchBooks(); 
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  const handleEditBook = async () => {
    if (editingBook) {
      try {
        const editedBookData = {
          title: newBook.title,
          author: newBook.author,
          price: newBook.price ? parseFloat(newBook.price) : undefined,
          categoryid: 1, 
        };
        await PUT<Book>(`/api/books/${editingBook.id}`, editedBookData);
        setEditingBook(null);
        setNewBook({ title: '', author: '', price: '' });
        await fetchBooks(); 
      } catch (error) {
        console.error('Error editing book', error);
      }
    }
  };

  const handleStartEditing = (book: Book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      price: book.price ? String(book.price) : '',
    });
  };

  const handleCancelEditing = () => {
    setEditingBook(null);
    setNewBook({ title: '', author: '', price: '' });
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await DELETE(`/api/books/${id}`);
      await fetchBooks(); 
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  return (
    <div>
      <h1>Book Listing</h1>
      <Link to="/bookdetails">Go to Book Details</Link>

      <h2>{editingBook ? 'Edit Book' : 'Add a New Book'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={e => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newBook.price}
        onChange={e => setNewBook({ ...newBook, price: e.target.value })}
      />
      {editingBook ? (
        <>
          <button onClick={handleEditBook}>Save Edit</button>
          <button onClick={handleCancelEditing}>Cancel Edit</button>
        </>
      ) : (
        <button onClick={handleAddBook}>Add Book</button>
      )}

      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} - ${book.price}
            <button onClick={() => handleStartEditing(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListing;
