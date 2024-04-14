"use client";

import Link from "next/link";

import { SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import SpeciesSearch from "@/components/speciesSearch";

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16  ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Dicionário das Aves
        </h1>
        <div className="flex flex-col items-center gap-12 px-12">
          <SpeciesSearch />

          {!isSignedIn ? (
            <div className="bg-primary-foreground text-primary w-fit rounded-md px-4  py-2">
              <SignInButton>Logar</SignInButton>
            </div>
          ) : (
            <Link
              className="bg-primary-foreground text-primary w-fit rounded-md px-4  py-2"
              href="/add"
            >
              Adicionar
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
