import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ListMakerComponent from './ListMakerComponent';

export default async function ListMaker() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return <ListMakerComponent />;
}
