import React from 'react';
import { Link } from 'react-router-dom';

const BookDetails: React.FC = () => {
  return (
    <div>
      <h1>Book Details</h1>
      <Link to="/booklisting">Go to Book Listing</Link>
    </div>
  );
};

export default BookDetails;
