import React, { useState, useEffect } from 'react';
import { GET, POST, PUT, DELETE } from './services/fetcher';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const fetchBooks = () => {
    GET('/api/books').then((response) => setBooks(response.books));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = async () => {
    try {
      await POST('/api/books', newBook);
      fetchBooks(); 
      setNewBook({ title: '', author: '' }); 
    } catch (error) {
      console.error('Error creating book', error);
    }
  };

  const handleUpdateBook = async (id: number) => {
    try {
      await PUT(`/api/books/${id}`, newBook);
      fetchBooks(); 
      setNewBook({ title: '', author: '' }); 
    } catch (error) {
      console.error('Error updating book', error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await DELETE(`/api/books/${id}`);
      fetchBooks(); 
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  return (
    <div className="mx-auto mt-5 w-50">
      <h1>Book List</h1>

      <div>
        <h2>Create New Book</h2>
        <label>Title: </label>
        <input type="text" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
        <label>Author: </label>
        <input type="text" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
        <button onClick={handleCreateBook}>Create</button>
      </div>

      <div>
        <h2>Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
              <button onClick={() => handleUpdateBook(book.id)}>Update</button>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
