import { signOutAction } from '@/app/actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action={signOutAction}>
        <Link href='/sign-in'>
        Sign out
        </Link>
          
      </form>
    </div>
  ) : (
    <div className='text-sm'>
      <Link href='/sign-in'>Sign in</Link>
    </div>
  );
}
