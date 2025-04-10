import { createClient } from '@/utils/supabase/client';

import { redirect } from 'next/navigation';

// gets the first 5 products
export async function getProducts(page: number = 1, pageSize: number = 10) {
    const supabase = await createClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('products')
        .select()
        .range(from, to)

    return { data: data, error: error }

}

// get products based on name
export async function getProductsByName(name: string, page: number = 1, pageSize: number = 10) {
    const supabase = await createClient();

    const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('products')
        .select()
        .ilike('product_name', `%${name}%`)
        .range(from, to)

    return { data: data, error: error }

}

// get products based on product type
export async function getProductsByType(type: string, page: number = 1, pageSize: number = 10) {
    const supabase = await createClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('products')
        .select('')
        .eq('product_type', `${type}`)
        .range(from, to)

    console.log(data)

}

// get products based on price range

// TODO: Change database data to string
export async function getProductsByPrice(min: number = 0.00, max: number = 10000.00, page: number = 1, pageSize: number = 10) {
    const supabase = await createClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('products')
        .select('')
        .gte('price', `%${min}%`)
        .lt('price', `%${max}%`)
        .range(from, to)

    console.log(data)

}


