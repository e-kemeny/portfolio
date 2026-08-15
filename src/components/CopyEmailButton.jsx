import { useState } from "react";

export default function CopyEmailButton({ email, className = "", children }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback if the Clipboard API is blocked in this context
      window.prompt("Copy this email:", email);
    }
  };

  return (
    <button onClick={handleClick} className={className} type="button">
      {copied ? "Copied!" : children}
    </button>
  );
}