import FetchDataSteps from '@/components/tutorial/fetch-data-steps';
import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getUserAction } from '@/app/protected/actions';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  // If user is not in users table insert it (Signed up but hasnt set up username or info)
  const { data, error } = await getUserAction();

  if (!data) {
    redirect('/protected/quiz');
  }

  return (
    <div className='flex w-full flex-1 flex-col gap-12'>
    <b> Welcome back to Skinple! </b>
    <ul>
      <li>Try the survey to recieve a list of recommended products!</li>
      <li>Or, build your own list of skincare products with our listmaker!</li>
    </ul>
    </div>
  );
}
