'use client';

import { useState } from 'react';

const cleanIngredientsList = [
  'capric triglyceride',
  'cetyl alcohol',
  'propanediol',
  'stearyl alcohol',
  'glycerin',
  'sodium hyaluronate',
  'arganine',
  'aspartic acid',
  'glycine',
  'alanine',
  'serine',
  'valine',
  'isoleucine',
  'proline',
  'threonine',
  'histidine',
  'phenylalanine',
  'glucose',
  'maltose',
  'fructose',
  'trehalose',
  'sodium pca',
  'pca',
  'sodium lactate',
  'urea',
  'allantoin',
  'linoleic acid',
  'oleic acid',
  'phytosteryl canola glycerides',
  'palmitic acid',
  'stearic acid',
  'lecithin',
  'triolein',
  'tocopherol',
  'carbomer',
  'isoceteth-20',
  'polysorbate 60',
  'sodium chloride',
  'citric acid',
  'trisodium ethylenediamine disuccinate',
  'pentylene glycol',
  'triethanolamine',
  'sodium hydroxide',
  'phenoxyethanol',
  'chlorphenesin',
];

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
  const [selectedProducts, setSelectedProducts] = useState<typeof products>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProducts((prev) => [...prev, product]);
    setTotalPrice((prev) => prev + product.price);
  };

  const handleProductRemove = (product: any) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.product_id !== product.product_id)
    );
    setTotalPrice((prev) => Math.max(0, prev - product.price)); // Ensure totalPrice doesn't go below 0
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

  const filteredProducts = products.filter(
    (product) => product.product_type === selectedCategory
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Maker</h1>

      {/* Step 1: Select a category */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select a Category</h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('moisturizer')}
          >
            Moisturizer
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('cleanser')}
          >
            Cleanser
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCategorySelect('toner')}
          >
            Toner
          </button>
        </div>
      </div>

      {/* Step 2: Select a product */}
      {selectedCategory && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Select a {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </h2>
          <ul className="list-disc pl-5">
            {filteredProducts.map((product) => (
              <li key={product.product_id} className="mb-2">
                <span className="font-medium">{product.product_name}</span> - $
                {product.price.toFixed(2)}
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleProductSelect(product)}
                >
                  Add
                </button>
                <ul className="ml-4 list-disc">
                  {product.clean_ingreds.map((ingredient, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

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
              </a>{' '}
              - ${product.price.toFixed(2)}
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
          Total Price: ${totalPrice.toFixed(2)}
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