import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Forge Web</h1>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        Next.js app with nuqs, react-hook-form, shadcn/ui, and Cypress built in.
      </p>
      <Button>Get started</Button>
    </main>
  );
}
