import type { ReactNode } from "react";
import { contactEmail, maskedEmail } from "../data/site";
import { mailtoHref } from "../lib/email";

interface MailLinkProps {
  subject?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Email link whose address is assembled at runtime — the HTML source only
 * ever contains a masked placeholder, so harvesters find nothing.
 */
export function MailLink({ subject, className, children }: MailLinkProps) {
  return (
    <a className={className} href={mailtoHref(contactEmail(), subject)}>
      {children ?? <span className="mail-link__text">{maskedEmail()}</span>}
    </a>
  );
}
