export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 flex min-h-screen flex-col items-center justify-center p-4 md:p-6">
      {children}
    </div>
  );
}
