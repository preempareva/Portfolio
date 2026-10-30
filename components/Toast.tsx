"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT } from "@/lib/toast";

export default function Toast() {
  const [message, setMessage] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer = 0;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setShown(true);
      clearTimeout(timer);
      timer = window.setTimeout(() => setShown(false), 2600);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`toast${shown ? " is-shown" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
