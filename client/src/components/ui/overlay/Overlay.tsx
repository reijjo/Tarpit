import { ComponentProps } from "react";
import styles from "./Overlay.module.css";

type OverlayProps = {
  bg?: string;
} & ComponentProps<"div">;

export default function Overlay({ bg, ...props }: OverlayProps) {
  return (
    <div
      className={styles.overlay}
      style={{ background: bg }}
      {...props}
      aria-hidden
    ></div>
  );
}
