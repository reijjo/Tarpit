import styles from "./ResponsiveImageWrapper.module.css";

import Image from "next/image";

type ResponsiveImageWrapperProps = {
  src: string;
  alt: string;
  title?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  extraClass?: string;
};

export default function ResponsiveImageWrapper({
  src,
  alt,
  title,
  objectFit = "cover",
  extraClass,
}: ResponsiveImageWrapperProps) {
  return (
    <div
      className={`${styles.resp_wrapper} ${extraClass}`}
      style={{ height: "100%" }}
    >
      <Image
        src={src}
        alt={alt}
        title={title ?? alt}
        fill
        style={{ objectFit: `${objectFit}` }}
      />
    </div>
  );
}
