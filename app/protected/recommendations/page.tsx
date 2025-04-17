import { createClient } from '@/utils/supabase/server';
import { getRecommendedProducts } from './actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AddToListButton from './AddToListButton'; // Import the Client Component

export default async function RecommendationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/sign-in');

  const { filtered } = await getRecommendedProducts(user.id);

  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Your Recommended Products</h1>

      {filtered.length > 0 ? (
        <div className='space-y-4'>
          {filtered.map((product) => (
            <div
              key={product.product_id}
              className='rounded border bg-white p-4 shadow'
            >
              <h2 className='text-lg font-semibold'>{product.product_name}</h2>
              <p>Price: {product.price}</p>
              <br />
              <p>Description: {product.description}</p>
              <br />
              <p>
                Ingredients: {product.clean_ingreds.replace(/['[\];]/g, '')}
              </p>

              <p className='text-sm text-gray-600'>{product.product_type}</p>
              <a
                href={product.product_url}
                className='mt-2 inline-block text-blue-500 underline'
                target='_blank'
              >
                View Product
              </a>

              {/* Pass the product object to the Client Component */}
              <div className='mt-4'>
              <AddToListButton product={product} />
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-4 text-red-600'>
          No products match your filters. Retake the{' '}
          <Link
            href='/protected/quiz'
            className='text-gray-600 hover:text-gray-800'
          >
            Survey
          </Link>{' '}
          or take it if you haven't yet?
        </p>
      )}
    </div>
  );
}