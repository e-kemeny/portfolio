import { useState } from "react";

/**
 * A mailto: link that also silently copies the address to the clipboard on
 * click. If the visitor has a mail client configured, it opens normally as
 * always. If they don't (common — some people only use webmail in browser),
 * clicking still does something useful: the email is now on their
 * clipboard, confirmed by a brief "Copied!" swap. No detection needed —
 * both outcomes are covered at once.
 */
export default function EmailLink({ email, className = "", children, ...rest }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      ?.writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
    // No preventDefault — the mailto: href still fires normally alongside this.
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} className={className} {...rest}>
      {copied ? "Copied!" : children}
    </a>
  );
}
