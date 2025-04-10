import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { findProductById } from '../actions';


export default async function Product({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    const id = (await params).id;

    const productId = params.id;

    // Fetch the product details using the findProductById function
    const product = await findProductById(productId);

    if (!product) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <p className="mb-2">
                <span className="font-medium">Type:</span> {product.product_type}
            </p>
            <p className="mb-2">
                <span className="font-medium">Price:</span> {product.price}
            </p>
            <a
                href="/protected/search"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Back to Search
            </a>
        </div>
    );
}