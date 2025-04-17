export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-[#fffafa] p-6 shadow-md'>
        {children}
      </div>
    </div>
  );
}
