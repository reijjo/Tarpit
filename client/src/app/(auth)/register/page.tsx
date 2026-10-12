import RegisterFrom from "@/components/auth/RegisterForm";
import ResponsiveImageWrapper from "@/components/ui/images/ResponsiveImageWrapper";

export default function Register() {
  return (
    <>
      <RegisterFrom />
      <ResponsiveImageWrapper
        src="/images/login-register/penkit-opti.webp"
        alt="seats"
        title="arena"
        extraClass="auth_page_image"
        sizes="50vw"
        loading="eager"
      />
    </>
  );
}
