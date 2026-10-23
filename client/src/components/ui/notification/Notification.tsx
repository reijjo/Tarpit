"use client";

import styles from "./Notification.module.css";

import { useEffect, useState } from "react";

const NOTIFICATION_DURATION_MS = 7_000;

type NotificationProps = {
  message: string;
  variant?: "info" | "warning" | "success" | "error";
};

export default function Notification({
  message,
  variant = "info",
}: NotificationProps) {
  return (
    <TimedNotification
      key={`${message}-${variant}`}
      message={message}
      variant={variant}
    />
  );
}

function TimedNotification({ message, variant }: Required<NotificationProps>) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setIsVisible(false),
      NOTIFICATION_DURATION_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  const role =
    variant === "error" || variant === "warning" ? "alert" : "status";

  return (
    <div className={`${styles.notification} ${styles[variant]}`} role={role}>
      <p>{message}</p>
      <span className={styles.timer} aria-hidden="true" />
    </div>
  );
}
