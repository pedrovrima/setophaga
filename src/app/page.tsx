import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import { SignIn } from "@clerk/nextjs";
import SpeciesSearch from "@/components/speciesSearch";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Dicionário das Aves
        </h1>
        <SpeciesSearch />
        <Link href="/add">Adicionar</Link>
      </div>
    </main>
  );
}
