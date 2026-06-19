import { useState } from 'react';
import { submitContactForm } from '../api/api';
import styles from './ContactPage.module.css';

// Returns a string error message or '' if the field is valid.
function validateField(name, value) {
  switch (name) {
    case 'name':
      return value.trim().length < 2 ? 'Name must be at least 2 characters.' : '';
    case 'email': {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!value.trim()) return 'Email is required.';
      return emailRe.test(value) ? '' : 'Please enter a valid email address.';
    }
    case 'message':
      return value.trim().length < 10 ? 'Message must be at least 10 characters.' : '';
    default:
      return '';
  }
}

const INITIAL = { name: '', email: '', message: '' };

export default function ContactPage() {
  const [fields, setFields] = useState(INITIAL);
  // Track which fields the user has touched so we only show errors after interaction.
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = Object.fromEntries(
    Object.entries(fields).map(([key, val]) => [key, validateField(key, val)])
  );

  const hasErrors = Object.values(errors).some(Boolean);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Mark everything touched so all errors show on submit attempt.
    setTouched({ name: true, email: true, message: true });
    if (hasErrors) return;

    setSubmitting(true);
    await submitContactForm(fields);
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleReset() {
    setFields(INITIAL);
    setTouched({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.success} role="status">
            <div className={styles.successIcon}>✓</div>
            <h2>Message sent!</h2>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button className={styles.resetBtn} onClick={handleReset}>
              Send another message
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Get in touch</h1>
          <p className={styles.subtitle}>Fill out the form below and I'll respond promptly.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.fieldLabel}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
              placeholder="Jane Smith"
              value={fields.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
              aria-invalid={touched.name && !!errors.name}
            />
            {touched.name && errors.name && (
              <p id="name-error" className={styles.errorMsg} role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              placeholder="jane@example.com"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
              aria-invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <p id="email-error" className={styles.errorMsg} role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.fieldLabel}>
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`${styles.input} ${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
              placeholder="Tell me what you have in mind…"
              value={fields.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
              aria-invalid={touched.message && !!errors.message}
            />
            {touched.message && errors.message && (
              <p id="message-error" className={styles.errorMsg} role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </main>
  );
}
