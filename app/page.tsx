import Hero from '@/components/hero';
import ConnectSupabaseSteps from '@/components/tutorial/connect-supabase-steps';
import SignUpUserSteps from '@/components/tutorial/sign-up-user-steps';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';

export default async function Home() {
  return (
    <>
    <b> Welcome to Skinple! </b>
    <ul>
      <li>To get started, sign in or sign up with the buttons at the top right!</li>
      <li>Once signed in, try the quiz to recieve a list of recommended products!</li>
      <li>Or, build your own list of skincare products with our listmaker!</li>
    </ul>
    </>
  );
}
