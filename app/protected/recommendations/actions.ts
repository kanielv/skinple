'use server';

import { createClient } from '@/utils/supabase/server';

export async function getRecommendedProducts(userId: string) {
    const supabase = await createClient();

    const { data: user, error: userError } = await supabase
        .from('users')
        .select('skin_type, price_min, price_max, sensitive')
        .eq('user_id', userId)
        .single();

    if (!user || userError) {
        return { filtered: [], debug: { error: 'Failed to load user' } };
    }

    const { data: userAllergies } = await supabase
        .from('user_allergies')
        .select('ingredient_id')
        .eq('user_id', userId);

    const { data: alcoholIngredient } = await supabase
        .from('ingredients')
        .select('ingredient_id')
        .ilike('name', '%alcohol%')

    const alcoholIds = alcoholIngredient?.map(i => i.ingredient_id) || [];


    const allergenIds = (userAllergies?.map(a => Number(a.ingredient_id)) || []).filter(Boolean);

    let blockedProductIds: number[] = [];
    let alcoholProductIds: number[] = [];

    if (allergenIds.length > 0) {
        const { data: blockedProducts } = await supabase
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

    const skinTypeFilters: string[] = [];

    if (user.skin_type === 'oily') {
        // Remove any product_type that contains "cream"
        skinTypeFilters.push('cream');
    }

    if (user.skin_type === 'dry') {
        // Remove exfoliants, serums, alcohols for dry skin
        skinTypeFilters.push('exfoliator', 'serum');
        //remove alcohols
        if (alcoholIds.length > 0) {
            const { data: alcoholProducts } = await supabase
              .from('product_ingredients')
              .select('product_id')
              .in('ingredient_id', alcoholIds);
          
            alcoholProductIds = alcoholProducts?.map(p => p.product_id) || [];
        }
    }

    // Filters based on sensitivity
    const sensitivityFilters: string[] = [];

    if (user.sensitive === true) {
        // Remove harsh products for sensitive skin
        sensitivityFilters.push('exfoliator', 'serum', 'harsh');
        //remove alcohols
        if (alcoholIds.length > 0) {
            const { data: alcoholProducts } = await supabase
              .from('product_ingredients')
              .select('product_id')
              .in('ingredient_id', alcoholIds);
          
            alcoholProductIds = alcoholProducts?.map(p => p.product_id) || [];
        }
    }

    const filtered = allProducts.filter((product: any) => {
        const numericPrice = parseFloat(product.price.replace('$', ''));

        const productType = product.product_type?.toLowerCase() || '';
        const name = product.product_name?.toLowerCase() || '';

        const isBlockedBySkinType = skinTypeFilters.some(filter =>
            productType.includes(filter)||name.includes(filter)
        );

        const isBlockedBySensitivity = sensitivityFilters.some(filter =>
            productType.includes(filter)
        );

        return (
            !isNaN(numericPrice) &&
            numericPrice >= user.price_min &&
            numericPrice <= user.price_max &&
            !blockedProductIds.includes(product.product_id) &&
            !isBlockedBySkinType &&
            !isBlockedBySensitivity &&
            !alcoholProductIds.includes(product.product_id)
        );
    });

    return {
        filtered
    };
}
