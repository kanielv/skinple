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
    <div className="flex w-full h-screen">
  {/* Left Section */}
  <div
  className="flex flex-col justify-start items-start w-1/2 p-8"
  style={{
    paddingLeft: '5%',
  }}
>
  <h1
    style={{
      fontSize: '4rem',
      fontWeight: 'light',
      fontFamily: 'Lora, serif',
      color: '#4a4a4a',
      marginBottom: '20px', // Add spacing below the heading
    }}
  >
    Welcome back to Skinple!
  </h1>
  <p
    style={{
      fontSize: '1.2rem',
      color: '#4a4a4a',
      marginBottom: '30px', // Add spacing below the paragraph
      fontFamily: 'DM Sans, sans-serif',
    }}
  >
    Explore personalized skincare recommendations and build your own list of products.
  </p>
  <div
    className="mt-6"
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <a
      href="/protected/quiz"
      className="button"
      style={{
        display: 'inline-block',
        padding: '12px 32px',
        backgroundColor: '#ffb5a7',
        color: '#fffafa',
        fontSize: '1.2rem',
        textDecoration: 'none',
        borderRadius: '8px',
        fontFamily: 'DM Sans, sans-serif',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        minWidth: '220px',
      }}
    >
      Retake the survey!
    </a>
  </div>
</div>

  {/* Right Section */}
  <div className="w-1/2 h-full">
    <img
      src="/skinple2.webp"
      alt="Skincare Model"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
      }}
    />
  </div>
</div>
  );
}

{/* <div className="mt-4">
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
        </div> */}