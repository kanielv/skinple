import { createClient } from '@/utils/supabase/server';
import { getRecommendedProducts } from './actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function RecommendationsPage() {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) redirect('/sign-in');

const { filtered, debug } = await getRecommendedProducts(user.id);

return (
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6">Your Recommended Products</h1>

    {filtered.length > 0 ? (
        <div className="space-y-4">
        {filtered.map(product => (
            <div
            key={product.product_id}
            className="border rounded p-4 bg-white shadow"
            >
            <h2 className="text-lg font-semibold">{product.product_name}</h2>
            <p>Price: {product.price}</p>
            <p>Ingredients: {product.clean_ingreds}</p>
            <p className="text-sm text-gray-600">{product.product_type}</p>
            <a
                href={product.product_url}
                className="text-blue-500 underline mt-2 inline-block"
                target="_blank"
            >
                View Product
            </a>
            </div>
        ))}
        </div>
    ) : (
        <p className="text-red-600 mt-4">No products match your filters. Retake the <Link href="/protected/quiz" className="text-gray-600 hover:text-gray-800">
        Quiz
      </Link> or take it if you haven't yet?</p>
    )}
    </div>
);
}
