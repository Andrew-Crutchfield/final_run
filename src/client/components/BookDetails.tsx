import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { GET } from '../services/fetcher';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

const BookDetails: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await GET('/api/books');
        setBooks(response.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
            </div>
          ))}
        </div>
      )}
      <Link to="/booklisting">Go to Book Listing</Link> 
    </div>
  );
};

export default BookDetails;