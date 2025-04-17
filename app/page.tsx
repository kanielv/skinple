import Hero from '@/components/hero';
import ConnectSupabaseSteps from '@/components/tutorial/connect-supabase-steps';
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import './homepage.css';
export default async function Home() {
  return (
    <div className='flex w-full flex-1 flex-col gap-8 leftspace2 topspace'>
    <h3> <b>Welcome to Skinple!</b></h3>

    <img 
      src='./app/new-high-glass-glass-bottle-came.png'
      alt="skincare bottles" 
      style={{ float: 'right', marginLeft: '10px' }} 
    />
    <div className='half'>
    <h1 style={{color:'#ffb5a7'}}> We believe everyone should be able to easily find skincare that works for them!</h1>
    </div>
    <br/>
    
    </div>
  );
}
