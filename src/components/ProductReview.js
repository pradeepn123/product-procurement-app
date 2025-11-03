import React, { useState } from 'react';

const ProductReview = ({ selectedProducts, onNavigate, onFinalSubmit }) => {
  const [products, setProducts] = useState(selectedProducts);

  const handleCountChange = (index, count) => {
    const updatedProducts = [...products];
    updatedProducts[index].count = Math.max(1, parseInt(count) || 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinalSubmit(products);
    onNavigate('final');
  };

  const handleBack = () => {
    onNavigate('selection', products);
  };

  return (
    <div>
      <h2>Selected Products Review</h2>
      
      <form id="productForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          {products.map((product, index) => (
            <div key={index} className="mb-2">
              <label className="form-label">
                {product.name}: 
                <input
                  type="number"
                  min="1"
                  value={product.count}
                  onChange={(e) => handleCountChange(index, e.target.value)}
                  className="form-control d-inline-block w-auto ms-2"
                />
              </label>
            </div>
          ))}
        </div>
        
        {products.length === 0 ? (
          <p>No products selected.</p>
        ) : (
          <div>
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductReview;