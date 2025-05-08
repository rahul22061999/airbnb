import { getAuthSession } from "@/utils/auth";
import Link from "next/link";
import React from "react";
import BecomeaHostComponent from "@/components/becomeaHostComponent";

async function becomeahost() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <section className="w-full h-screen grid place-items-center">
        <div>
          <h1>Not authorized</h1>
          <Link href="/sign-in" className="underline">
            Sign in to acess
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <BecomeaHostComponent session={session} />
    </div>
  );
}

export default becomeahost;
