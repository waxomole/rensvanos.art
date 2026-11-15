import { useState, type FormEvent } from "react";
import { contactEmail } from "../data/site";
import { mailtoHref } from "../lib/email";
import { useT } from "../i18n/LangContext";
import { Reveal } from "./Reveal";

type RequestType = "print" | "origineel" | "commissie" | "anders";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * On-site enquiry form. Submitting composes a prefilled mailto: to the
 * (runtime-decoded) contact address and hands it to the visitor's own mail
 * app — no backend, no server storage, and the address never appears in the
 * page source.
 */
export function EnquiryForm() {
  const t = useT();
  const f = t.commissions.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<RequestType | "">("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailOk = EMAIL_PATTERN.test(email.trim());
    const complete = name.trim() && type && message.trim();
    setInvalid({
      name: !name.trim(),
      email: !emailOk,
      type: !type,
      message: !message.trim(),
    });

    if (!complete || !emailOk) {
      setError(email.trim() && !emailOk ? f.errorEmail : f.errorMissing);
      return;
    }
    setError(null);

    const mailSubject = `[${type}] ${subject.trim() || name.trim()}`;
    const subjectLine = subject.trim() ? `${f.bodySubject}: ${subject.trim()}\n` : "";
    const body =
      `${name.trim()} <${email.trim()}>\n\n` +
      `${f.bodyType}: ${type}\n` +
      subjectLine +
      `\n${f.bodyMessage}:\n${message.trim()}\n\n` +
      `— ${f.sentFrom}`;

    window.location.href = mailtoHref(contactEmail(), mailSubject, body);
  };

  const fieldClass = (field: string, base: string) =>
    invalid[field] ? `${base} is-invalid` : base;

  return (
    <section className="form" id="aanvraag">
      <Reveal className="glass form__panel">
        <p className="eyebrow">{f.eyebrow}</p>
        <h2>{f.title}</h2>
        <p className="form__intro">{f.intro}</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <div className="form__field">
              <label htmlFor="fName">{f.nameLabel}</label>
              <input
                id="fName"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClass("name", "")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__field">
              <label htmlFor="fEmail">{f.emailLabel}</label>
              <input
                id="fEmail"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass("email", "")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form__field">
            <label htmlFor="fType">{f.typeLabel}</label>
            <select
              id="fType"
              name="type"
              required
              className={fieldClass("type", "")}
              value={type}
              onChange={(e) => setType(e.target.value as RequestType | "")}
            >
              <option value="" disabled>
                {f.typePlaceholder}
              </option>
              <option value="print">{f.typeOptions.print}</option>
              <option value="origineel">{f.typeOptions.origineel}</option>
              <option value="commissie">{f.typeOptions.commissie}</option>
              <option value="anders">{f.typeOptions.anders}</option>
            </select>
          </div>
          <div className="form__field">
            <label htmlFor="fSubject">
              {f.subjectLabel} <span className="form__optional">{f.optional}</span>
            </label>
            <input
              id="fSubject"
              name="subject"
              type="text"
              placeholder={f.subjectPlaceholder}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form__field">
            <label htmlFor="fMessage">{f.messageLabel}</label>
            <textarea
              id="fMessage"
              name="message"
              rows={5}
              required
              placeholder={f.messagePlaceholder}
              className={fieldClass("message", "")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {error && (
            <p className="form__error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn--ink form__submit" type="submit">
            {f.submit}
          </button>
          <p className="form__note">{f.note}</p>
        </form>
      </Reveal>
    </section>
  );
}
