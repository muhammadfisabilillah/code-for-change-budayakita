import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center gap-4 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="size-8" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The culture or page you&apos;re looking for doesn&apos;t exist. Let&apos;s
        get you back to exploring.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}