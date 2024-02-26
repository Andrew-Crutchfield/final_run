import React from 'react';
import { Routes, Route } from 'react-router-dom';
import home from '../components/Home';
import BookListing from '../components/BookListing';
import BookDetails from '../components/BookDetails';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booklisting" element={<BookListing />} />
      <Route path="/bookdetails" element={<BookDetails />} />
    </Routes>
  );
};

export default AppRouter;