import React, { useState, useEffect } from 'react';
import ProductSelection from './components/ProductSelection';
import ProductReview from './components/ProductReview';
import FinalSubmission from './components/FinalSubmission';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('selection');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [finalProducts, setFinalProducts] = useState([]);

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const savedSelected = sessionStorage.getItem('selectedProducts');
    const savedFinal = sessionStorage.getItem('finalProducts');
    
    if (savedSelected) {
      setSelectedProducts(JSON.parse(savedSelected));
    }
    if (savedFinal) {
      setFinalProducts(JSON.parse(savedFinal));
    }
  }, []);

  const navigateTo = (page, data = null) => {
    if (data) {
      setSelectedProducts(data);
      sessionStorage.setItem('selectedProducts', JSON.stringify(data));
    }
    setCurrentPage(page);
  };

  const handleFinalSubmit = (data) => {
    setFinalProducts(data);
    sessionStorage.setItem('finalProducts', JSON.stringify(data));
    setCurrentPage('final');
  };

  const handleFinalSubmission = (companyData) => {
    // Clear session storage
    sessionStorage.removeItem('selectedProducts');
    sessionStorage.removeItem('finalProducts');
    
    // Reset states
    setSelectedProducts([]);
    setFinalProducts([]);
    
    // Navigate back to selection page after delay
    setTimeout(() => {
      setCurrentPage('selection');
    }, 3000);
  };

  return (
    <div className="App container mt-4">
      {currentPage === 'selection' && (
        <ProductSelection 
          selectedProducts={selectedProducts}
          onNavigate={navigateTo}
        />
      )}
      
      {currentPage === 'review' && (
        <ProductReview 
          selectedProducts={selectedProducts}
          onNavigate={navigateTo}
          onFinalSubmit={handleFinalSubmit}
        />
      )}
      
      {currentPage === 'final' && (
        <FinalSubmission 
          finalProducts={finalProducts}
          onFinalSubmission={handleFinalSubmission}
        />
      )}
    </div>
  );
}

export default App;