import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';


export default async function Product({ params }: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    const id = (await params).id;

    return (
        <>
            <h1>Product {id}</h1>
        </>
    )
}