import { signOutAction } from '@/app/actions';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      <form action={signOutAction}>
        <Link href='/sign-in'>Sign out</Link>
      </form>
    </div>
  ) : (
    <div className='text-sm'>
      <Link href='/sign-in'>Sign in</Link>
    </div>
  );
}
