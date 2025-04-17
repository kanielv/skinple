import FetchDataSteps from '@/components/tutorial/fetch-data-steps';
import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getUserAction } from '@/app/protected/actions';
import './../homepage.css';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  // If user is not in users table insert it (Signed up but hasn't set up username or info)
  const { data, error } = await getUserAction();

  if (!data) {
    redirect('/protected/quiz');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="text-center md:text-left">
          <h1
            style={{
              fontSize: '3rem',

              fontFamily: 'Lora, serif',
              color: '#333',
            }}
          >
            Welcome back to Skinple!
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#555',
              marginTop: '10px',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Explore personalized skincare recommendations and build your own list of products.
          </p>
          <div className="mt-4">
            <a
              href="/protected/recommendations"
              className="link"
              style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '1.1rem',
                color: '#007BFF',
                textDecoration: 'underline',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Check out products recommended for you!
            </a>
            <a
              href="/protected/list-maker"
              className="link"
              style={{
                display: 'block',
                fontSize: '1.1rem',
                color: '#007BFF',
                textDecoration: 'underline',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Build your own list of skincare products with our listmaker!
            </a>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src="./app/skinple2.webp"
            alt="Skincare Model"
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: '400px',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>

      {/* Belief Section */}
      <p
            style={{
              fontSize: '2rem',
              color: '#555',
              marginTop: '10px',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            We believe everyone should be able to easily find skincare that works for them!
      </p>

      {/* Retake Quiz Button */}
      <div className="mt-6">
        <a
          href="/protected/quiz"
          className="button"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '5px',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Retake the quiz!
        </a>
      </div>
    </div>
  );
}