export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-[#fffafa] rounded-lg shadow-md">
        {children}
      </div>
    </div>
  )
}
