import styles from "./ResponsiveImageWrapper.module.css";

import { CSSProperties } from "react";

import Image, { ImageProps } from "next/image";

type ResponsiveImageWrapperProps = {
  src: string;
  alt: string;
  title?: string;
  objectFit?: CSSProperties["objectFit"];
  extraClass?: string;
  sizes?: string;
  loading?: ImageProps["loading"];
};

export default function ResponsiveImageWrapper({
  src,
  alt,
  title,
  objectFit = "cover",
  extraClass,
  sizes = "100vw",
  loading = "lazy",
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
        sizes={sizes}
        loading={loading}
      />
    </div>
  );
}
