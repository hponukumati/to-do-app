// Snackbar.jsx
import React from 'react';

const Snackbar = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 bg-green-500 text-white rounded">
      {message}
    </div>
  );
};

export default Snackbar;
