'use server';

import { createClient } from '@/utils/supabase/server';

export async function getRecommendedProducts(userId: string) {
const supabase = await createClient();

const { data: user, error: userError } = await supabase
    .from('users')
    .select('skin_type, price_min, price_max')
    .eq('user_id', userId)
    .single();

if (!user || userError) {
    return { filtered: [], debug: { error: 'Failed to load user' } };
}

const { data: userAllergies, error: allergyError } = await supabase
    .from('user_allergies')
    .select('ingredient_id')
    .eq('user_id', userId);

const allergenIds = (userAllergies?.map(a => Number(a.ingredient_id)) || []).filter(Boolean);

let blockedProductIds: number[] = [];

if (allergenIds.length > 0) {
    const { data: blockedProducts, error: blockedError } = await supabase
    .from('product_ingredients')
    .select('product_id')
    .in('ingredient_id', allergenIds);

    blockedProductIds = blockedProducts?.map(p => p.product_id) || [];
}

const { data: allProducts, error: productError } = await supabase
    .from('products')
    .select('*');

if (!allProducts || productError) {
    return { filtered: [], debug: { error: 'Failed to load products' } };
}

const filtered = allProducts.filter((product: any) => {
    const numericPrice = parseFloat(product.price.replace('£', ''));
    return (
    !isNaN(numericPrice) &&
    numericPrice >= user.price_min &&
    numericPrice <= user.price_max &&
    !blockedProductIds.includes(product.product_id)
    );
});

return {
    filtered
};
}
