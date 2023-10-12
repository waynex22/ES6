import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
    <div className="relative">
    <div className="w-20 h-20 border-transparent border-2 rounded-full"></div>
    <div className="w-20 h-20 border-mint border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
</div>

<div className="relative">
    <div className="w-10 h-10 border-transparent border-2 rounded-full"></div>
    <div className="w-10 h-10 border-mint border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
</div>

<div className="relative">
    <div className="w-5 h-5 border-transparent border-2 rounded-full"></div>
    <div className="w-5 h-5 border-mint border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
</div>
    </div>
  );
};

export default LoadingSpinner;