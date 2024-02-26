import React from 'react';
import { Link } from 'react-router-dom';

const BookListing: React.FC = () => {
  return (
    <div>
      <h1>Book Listing</h1>
      <Link to="/bookdetails">Go to Book Details</Link>
    </div>
  );
};

export default BookListing;