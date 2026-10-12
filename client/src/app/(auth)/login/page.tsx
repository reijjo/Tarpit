import LoginForm from "@/components/auth/LoginForm";
import ResponsiveImageWrapper from "@/components/ui/images/ResponsiveImageWrapper";

export default function Login() {
  return (
    <>
      <LoginForm />
      <ResponsiveImageWrapper
        src="/images/login-register/tennis-opti.webp"
        alt="seats"
        title="arena"
        extraClass="auth_page_image"
        sizes="50vw"
        loading="eager"
      />
    </>
  );
}
