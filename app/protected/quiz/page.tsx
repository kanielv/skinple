import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Form from './Form';

export default async function Quiz() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return <Form />;
}