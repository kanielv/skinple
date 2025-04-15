'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const products = [
  {
    product_id: 1,
    product_name: 'Cerave Moisturizer',
    product_url: 'https://example.com/cerave-moisturizer',
    product_type: 'moisturizer',
    clean_ingreds: ['glycerin', 'sodium hyaluronate', 'capric triglyceride'],
    price: 12.99,
  },
  {
    product_id: 2,
    product_name: 'Neutrogena Cleanser',
    product_url: 'https://example.com/neutrogena-cleanser',
    product_type: 'cleanser',
    clean_ingreds: ['phenoxyethanol', 'sodium chloride', 'citric acid'],
    price: 8.99,
  },
  {
    product_id: 3,
    product_name: 'La Roche-Posay Toner',
    product_url: 'https://example.com/la-roche-toner',
    product_type: 'toner',
    clean_ingreds: ['glycerin', 'citric acid', 'sodium hydroxide'],
    price: 14.99,
  },
  {
    product_id: 4,
    product_name: 'Cetaphil Moisturizer',
    product_url: 'https://example.com/cetaphil-moisturizer',
    product_type: 'moisturizer',
    clean_ingreds: ['propanediol', 'phenoxyethanol', 'triethanolamine'],
    price: 10.99,
  },
];

export default function ListMakerComponent() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  const router = useRouter();

  // Sync with localStorage in real-time
  useEffect(() => {
    // Load initial products from localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem('selectedProducts') || '[]'
    );
    setSelectedProducts(storedProducts);
    setTotalPrice(
      storedProducts.reduce((total: number, product: any) => total + parseFloat(product.price.substring(1)), 0)
    );

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedProducts = JSON.parse(
        localStorage.getItem('selectedProducts') || '[]'
      );
      setSelectedProducts(updatedProducts);
      setTotalPrice(
        updatedProducts.reduce((total: number, product: any) => total +parseFloat(product.price.substring(1)), 0)
      );
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Redirect to the Search page with the selected category as a query parameter
    router.push(`/protected/search?category=${category}`);
  };

  const handleProductRemove = (product: any) => {
    const updatedProducts = selectedProducts.filter(
      (p) => p.product_id !== product.product_id
    );
    setSelectedProducts(updatedProducts);
    setTotalPrice((prev) => Math.max(0, prev - parseFloat(product.price.substring(1)))); // Ensure totalPrice doesn't go below 0
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  const handleExportList = () => {
    const exportData = {
      selectedProducts,
      totalPrice,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected-products.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Maker</h1>

      {/* Step 1: Select a category */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select a Category</h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('Moisturiser')}
          >
            Moisturizer
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('Cleanser')}
          >
            Cleanser
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('Toner')}
          >
            Toner
          </button>
        </div>
      </div>

      {/* Step 3: Display selected products and total price */}
      <div>
        <h2 className="text-lg font-semibold">Selected Products</h2>
        <ul className="list-disc pl-5">
          {selectedProducts.map((product) => (
            <li key={product.product_id} className="mb-2">
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {product.product_name}
              </a>
              <button
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleProductRemove(product)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <h3 className="mt-4 text-lg font-bold">
          Total Price: £{totalPrice}
        </h3>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleExportList}
        >
          Export List
        </button>
      </div>
    </div>
  );
}