import FetchDataSteps from '@/components/tutorial/fetch-data-steps';
import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getUserAction } from '@/app/protected/actions';
import './../homepage.css';
import pic from './../new-high-glass-glass-bottle-came.png';
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
    <div>
    <div className='flex w-full flex-1 flex-col gap-8 leftspace2 topspace'>
    <h3> <b>Welcome back to Skinple!</b></h3>
    <a href='/protected/recommendations' className='link'>Check out products recommended for you! </a>
    <a href='/protected/list-maker' className='link'>Build your own list of skincare products with our listmaker!</a>
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <img 
        src={pic.src}
        alt="skincare bottles" 
        style={{ height: 'auto', width: '400px' }} 
      />
    </div>
    <div className='flex w-full flex-1 flex-col gap-8 leftspace2 topspace'>

    <div className='half'>
    <h1 style={{color:'#ffb5a7'}}> We believe everyone should be able to easily find skincare that works for them!</h1>
    </div>
    <br/>
    <div className='button'>
    <b><a href='/protected/quiz'>Retake the quiz!</a></b></div>
    </div>
    </div>
    
  );
}
