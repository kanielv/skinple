'use client';

import { addToList } from '@/utils/addToList';

export default function AddToListButton({ product }: { product: any }) {
  const handleAddToList = () => {
    addToList(product);
  };

  return (
    <button
      onClick={handleAddToList}
      className='mt-4 rounded px-4 py-2 text-white hover:bg-blue-600'
      style={{ backgroundColor: '#ffb5a7' }} // Updated background color
    >
      Add to List
    </button>
  );
}