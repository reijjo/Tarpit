import "./layout.css";

import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/services/auth";

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth_page">
      <div className="auth_page_content">{children}</div>
    </main>
  );
}
