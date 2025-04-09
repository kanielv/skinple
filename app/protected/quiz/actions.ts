'use server';

import { createClient } from '@/utils/supabase/server';

// Mock data for quiz

export const quizSubmitAction = async () => {
    // Quiz
    // const skin_type = formData.get("skin_type");
    // const price_min = formData.get("price_min");
    // const price_max = formData.get("price_max");
    // const allergies = formData.get("allergies");

    // Initialize client
    const supabase = await createClient();

    // Query user from user id
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log(user?.id);

    const { data, error } = await supabase.from("users").select();
    console.log("Users", data);
    // Insert to database
    // const { error } = await supabase
    //     .from('')
}