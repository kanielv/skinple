'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '@/app/protected/types';


// Get user from users table
export async function getUserAction() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
      }

    const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq('user_id', user.id)
        .single();
    
    if (error && error.code == 'PGRST116') {
        return { data: null, error: error }
    }
    
    return { data: data, error: null }
    
}

export async function createUserAction(newUser: User) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
      }
    
    const id = newUser.id;
    const name = newUser.name;

    const { error } = await supabase
      .from("users")
      .insert({ user_id: id, name: name})
    
    return { error: error }
}