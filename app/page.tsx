"use client";

import LoggoutButton from "@/components/loggout-button";
import { useStore } from "@/hooks/store";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const { user } = useStore();

  if (!user.id) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <h2 className="sm:text-3xl text-xl font-bold">Welcome {user.name}</h2>
      <p className="sm:text-xl text-base font-normal">
        Your registration in the application has been successful
      </p>
      <CheckCircle className="h-8 w-8 text-emerald-600 mt-2" />
      <LoggoutButton />
    </div>
  );
}

export default Home;
