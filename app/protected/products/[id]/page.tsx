import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { findProductById } from '../actions';

export default async function Product({
    params,
  }: {
    params: Promise<{ id: string }>; // Ensure params is explicitly typed as an object with an id property
  }) {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect('/sign-in');
    }
  
    const productId = (await params).id;
  
    // Fetch the product details using the findProductById function
    const product = await findProductById(productId);
  
    if (!product) {
      return (
        <div className='p-4'>
          <h1 className='text-2xl font-bold text-red-500'>Product not found</h1>
        </div>
      );
    }
  
    return (
      <div className='mx-auto max-w-4xl p-6'>
        <h1 className='mb-4 text-3xl font-bold'>{product.product_name}</h1>
        <p className='mb-2'>
          <span className='font-medium'>Type:</span> {product.product_type}
        </p>
        <p className='mb-2'>
          <span className='font-medium'>Price:</span> {product.price}
        </p>
        <a
          href='/protected/search'
          className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Back to Search
        </a>
      </div>
    );
  }