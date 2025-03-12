import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/features/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components UI.",
};

export default function AuthenticationPage() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <GoogleAuthButton />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Created by Jashwanth S Poojary{" "}
            <Link
              href="https://jashwanth.me"
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              Portfolio
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
