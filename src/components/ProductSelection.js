import React, { useState } from 'react';

const ProductSelection = ({ selectedProducts, onNavigate }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple', selected: false, count: 1 },
    { id: 2, name: 'Orange', selected: false, count: 1 },
    { id: 3, name: 'Banana', selected: false, count: 1 },
    { id: 4, name: 'Strawberries', selected: false, count: 1 },
    { id: 5, name: 'Mangoes', selected: false, count: 1 }
  ]);

  // Initialize products based on previously selected items
  React.useEffect(() => {
    if (selectedProducts.length > 0) {
      const updatedProducts = products.map(product => {
        const selectedProduct = selectedProducts.find(sp => sp.name === product.name);
        return selectedProduct 
          ? { ...product, selected: true, count: parseInt(selectedProduct.count) }
          : product;
      });
      setProducts(updatedProducts);
    }
  }, [selectedProducts]);

  const toggleProductSelection = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, selected: !product.selected }
        : product
    ));
  };

  // const handleCountChange = (productId, count) => {
  //   setProducts(products.map(product => 
  //     product.id === productId 
  //       ? { ...product, count: Math.max(1, parseInt(count) || 1) }
  //       : product
  //   ));
  // };

  const handleBookNow = () => {
    const selectedItems = products
      .filter(product => product.selected)
      .map(product => ({
        name: product.name,
        count: product.count
      }));

    onNavigate('review', selectedItems);
  };

  const hasSelectedProducts = products.some(product => product.selected);

  return (
    <div>
      <h1>Product Selection</h1>
      
      <div className="product-n">
        <ul className="product-list">
          {products.map(product => (
            <li
              key={product.id}
              className={`product-item ${product.selected ? 'selected' : ''}`}
              onClick={() => toggleProductSelection(product.id)}
            >
              <span>{product.name}</span>
              {/* <input
                type="number"
                min="1"
                value={product.count}
                onChange={(e) => handleCountChange(product.id, e.target.value)}
                className="count-input"
                disabled={!product.selected}
                onClick={(e) => e.stopPropagation()}
              /> */}
            </li>
          ))}
        </ul>

        {hasSelectedProducts && (
          <button 
            className="btn btn-primary mt-3"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSelection;