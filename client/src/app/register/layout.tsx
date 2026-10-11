import "./layout.css";

import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="auth_page">
      <div className="auth_page_content">{children}</div>
    </main>
  );
}
