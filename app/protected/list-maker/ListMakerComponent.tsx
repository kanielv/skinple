'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveListToDatabase } from './actions';

export default function ListMakerComponent() {
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [listName, setListName] = useState('');

  const router = useRouter();

  // Sync with localStorage in real-time
  useEffect(() => {
    // Load initial products from localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem('selectedProducts') || '[]',
    );
    setSelectedProducts(storedProducts);
    setTotalPrice(
      storedProducts.reduce(
        (total: number, product: any) =>
          total + parseFloat(product.price.substring(1)),
        0,
      ),
    );

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedProducts = JSON.parse(
        localStorage.getItem('selectedProducts') || '[]',
      );
      setSelectedProducts(updatedProducts);
      setTotalPrice(
        updatedProducts.reduce(
          (total: number, product: any) =>
            total + parseFloat(product.price.substring(1)),
          0,
        ),
      );
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    // setSelectedCategory(category);
    // Redirect to the Search page with the selected category as a query parameter
    router.push(`/protected/search?category=${category}`);
  };

  const handleProductRemove = (product: any) => {
    const updatedProducts = selectedProducts.filter(
      (p) => p.product_id !== product.product_id,
    );
    setSelectedProducts(updatedProducts);
    setTotalPrice((prev) =>
      Math.max(0, prev - parseFloat(product.price.substring(1))),
    ); // Ensure totalPrice doesn't go below 0
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

  const handleSaveList = async () => {
    try {
      if (!listName.trim()) {
        alert('Please enter a name for your list.');
        return;
      }

      const exportData = {
        selectedProducts,
        totalPrice,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });

      const message = await saveListToDatabase(blob, listName);
      alert(message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>List Maker</h1>

      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>Select a Category</h2>
        <div className='flex gap-2'>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Moisturiser')}
          >
            Moisturizer
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Cleanser')}
          >
            Cleanser
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Toner')}
          >
            Toner
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Serum')}
          >
            Serum
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Oil')}
          >
            Oil
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Mask')}
          >
            Mask
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Exfoliator')}
          >
            Exfoliator
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => handleCategorySelect('Body Wash')}
          >
            Body Wash
          </button>
        </div>
      </div>

      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>Name Your List</h2>
        <input
          type='text'
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder='Enter list name'
          className='rounded border px-4 py-2'
          style={{
            width: '10%',
          }}
        />
      </div>

      <div>
        <h2 className='text-lg font-semibold'>Selected Products</h2>
        <ul className='list-disc pl-5'>
          {selectedProducts.map((product) => (
            <li key={product.product_id} className='mb-2'>
              <a
                href={product.product_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline'
              >
                {product.product_name}
              </a>
              <button
                className='ml-2 rounded bg-red-500 px-2 py-1 text-white'
                onClick={() => handleProductRemove(product)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <h3 className='mt-4 text-lg font-bold'>Total Price: ${totalPrice}</h3>
        <div className='mt-4 flex gap-4'>
          <button
            className='rounded bg-green-500 px-4 py-2 text-white'
            onClick={handleSaveList}
          >
            Save List
          </button>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={handleExportList}
          >
            Export List
          </button>
        </div>
      </div>
    </div>
  );
}
