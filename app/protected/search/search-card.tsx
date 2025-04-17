'use client';

interface SearchCardProps {
  name: string;
  productId: string;
  type: string;
  price: string;
}

export default function SearchCard({
  name,
  productId,
  type,
  price,
}: SearchCardProps) {
  return (
    <div className='w-full rounded-xl border bg-white p-4 shadow-sm'>
      <h2 className='mb-2 text-lg font-semibold'>{name}</h2>
      <a
        href={`/protected/products/${productId}`}
        target='_blank'
        rel='noopener noreferrer'
        className='mb-2 block text-sm text-blue-600 underline'
      >
        View Product
      </a>
      <p className='mb-1 text-sm'>
        <span className='font-medium'>Type:</span> {type}
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Price:</span> {price}
      </p>
    </div>
  );
}
