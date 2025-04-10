'use client';

import { useState, useCallback, useEffect } from 'react';
import { getProductsByName, getProductsByType } from './actions';
import { useSearchParams } from 'next/navigation';
import SearchCard from './search-card';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pageSize = 10;
    const searchParams = useSearchParams();
    const category = searchParams.get('category'); // Get the category from the query parameter

    // Fetch products by name or category
    const fetchProducts = useCallback(
        async (name: string, category: string | null, page: number) => {
            setLoading(true);
            setError(null);
            try {
                let data, error;
                if (category) {
                    // Fetch products by category
                    ({ data, error } = await getProductsByType(category, page, pageSize));
                } else {
                    // Fetch products by name
                    ({ data, error } = await getProductsByName(name, page, pageSize));
                }

                if (error) {
                    throw new Error(error.message);
                }
                setProducts(data || []);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch products');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        },
        [pageSize]
    );

    // Fetch products when the category changes or on search
    useEffect(() => {
        if (category) {
            fetchProducts('', category, page); // Fetch by category
        } else if (query) {
            fetchProducts(query, null, page); // Fetch by name
        }
    }, [category, query, page, fetchProducts]);

    // Handle search form submission
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchProducts(query, null, 1);
    };

    // Handle pagination
    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(query, null, nextPage);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchProducts(query, null, prevPage);
        }
    };

    // Add product to localStorage
    const handleAddProduct = (product: any) => {
        const existingProducts = JSON.parse(
            localStorage.getItem('selectedProducts') || '[]'
        );
        const updatedProducts = [...existingProducts, product];
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));

        // Notify the user
        alert(`${product.product_name} added to your list!`);
    };

    return (
        <div className="w-full px-4 py-6 space-y-4">
            {/* Search Form */}
            {!category && (
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-md"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
            )}

            {/* Loading State */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}

            {/* Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Products List */}
            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.product_id}>
                        <SearchCard
                            name={product.product_name}
                            productId={product.product_id}
                            type={product.product_type}
                            price={`${product.price}`}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full"
                            onClick={() => handleAddProduct(product)}
                        >
                            Add to List
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {!category && products.length > 0 && (
                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">Page {page}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={products.length < pageSize}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}