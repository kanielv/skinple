//Actions file for authenticated posting with client
'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function submitQuiz(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/sign-in');
    }

    const skinType = formData.get('skinType')?.toString() || 'normal';
    const sensitivity = formData.get('sensitivity') === 'true';



    const priceMin = Number(formData.get('priceMin')) || 0;

    const priceMax = Number(formData.get('priceMax')) || 5000;
    //throw new Error(user.id + " aaaa " + skinType + " aaa " + priceMin + " aa " + priceMax);// Update user profile
    const { error: profileError } = await supabase
        .from('users')
        .upsert({
            user_id: user.id,
            skin_type: skinType,
            price_min: priceMin,
            price_max: priceMax,
            sensitive: sensitivity
        });

    if (profileError) {
        throw profileError;
    }

    await supabase
        .from('user_allergies')
        .delete()
        .eq('user_id', user.id);

    // Get selected allergies from form
    const selectedAllergies = formData.getAll('allergies')
        .map(allergy => Number(allergy));

    if (selectedAllergies.length > 0) {
        const allergyRecords = selectedAllergies.map(ingredientId => ({
            user_id: user.id,
            ingredient_id: ingredientId
        }));

        const { error: allergyError } = await supabase
            .from('user_allergies')
            .insert(allergyRecords);

        if (allergyError) {
            throw allergyError;
        }
    }

    redirect('/protected/recommendations');
}