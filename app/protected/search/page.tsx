import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getProducts, getProductsByName, getProductsByType, getProductsByPrice } from './actions';


export default async function search() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    const { data, error } = await getProducts();
    console.log("data", typeof(data));
    return (
        <>
            search
        </>
    )
}