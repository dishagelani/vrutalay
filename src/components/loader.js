import React from 'react';

const Loader = () => {

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="w-8 h-8 border-4 border-gradient border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
  
  );
};

export default Loader;