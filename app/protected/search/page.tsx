import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SearchBar from './search-bar';

export default async function search() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <>
      <SearchBar />
    </>
  );
}
