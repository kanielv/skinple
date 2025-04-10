import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getProducts, getProductsByName, getProductsByType, getProductsByPrice } from './actions';
import ProductList from './product-list';
import SearchCard from './search-card';
import SearchBar from './search-bar'
import Link from 'next/link'

interface SearchPageProps {
    searchParams?: {
        page?: string
    }
}


export default async function search({ searchParams }: SearchPageProps) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    return (
        <>
            <SearchBar />
        </>
    )
}
