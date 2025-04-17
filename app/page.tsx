import './homepage.css';

export default async function Home() {
  return (
    <div className='flex h-screen w-full'>
      {/* Left Section */}
      <div
        className='flex w-1/2 flex-col items-start justify-start p-8'
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
          Explore personalized skincare recommendations and build your own list
          of products.
        </p>
        <div
          className='mt-6'
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a
            href='/protected/quiz'
            className='button'
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
            Get Started!
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className='h-full w-1/2'>
        <img
          src='/skinple2.webp'
          alt='Skincare Model'
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
