import React, { useState, useEffect } from 'react';
import { GET, POST, DELETE } from '../services/fetcher'; 

interface Book {
  id: number;
  title: string;
  author: string;
  price?: number; 
}

const BookListing: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await GET<{ books: Book[] }>('/api/books');
        if (response.books) {
          setBooks(response.books); 
        } else {
          console.error('Books data is not in expected format:', response);
        }
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      const addedBook = await POST<Book>('/api/books', {
        title: newBook.title,
        author: newBook.author,
        price: newBook.price ? parseFloat(newBook.price) : undefined,
      });
      setBooks(currentBooks => [...currentBooks, addedBook]);
      setNewBook({ title: '', author: '', price: '' });
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await DELETE(`/api/books/${id}`);
      setBooks(currentBooks => currentBooks.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  return (
    <div>
      <h1>Book Listing</h1>
      <h2>Add a New Book</h2>
      <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
      <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
      <input type="number" placeholder="Price" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: e.target.value })} />
      <button onClick={handleAddBook}>Add Book</button>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} - ${book.price ? book.price.toFixed(2) : "N/A"}
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListing;