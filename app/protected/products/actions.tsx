import { createClient } from '@/utils/supabase/server';

export async function findProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }

  return data; // Return the product data
}
