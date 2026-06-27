'use client';

import { useForm } from 'react-hook-form';
import { useState, cloneElement, isValidElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES } from '@/data/site';

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  timeline: string;
  budget: string;
  message: string;
  honeypot: string; // anti-spam
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const params = useSearchParams();
  const preselect = params.get('service') ?? '';
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: preselect,
      timeline: '',
      budget: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.honeypot) return; // silent drop
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      reset();
    } catch {
      // Static-export fallback: open the visitor's email client with a pre-filled note.
      // Replace with a real API endpoint (e.g. Resend) when deploying SSR.
      const subject = encodeURIComponent(`New inquiry from ${values.name}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || '—'}\nProject type: ${values.service || '—'}\nTimeline: ${values.timeline || '—'}\nBudget: ${values.budget || '—'}\n\nMessage:\n${values.message}`,
      );
      window.location.href = `mailto:admin@goodgoddessalmighty.com?subject=${subject}&body=${body}`;
      setStatus('success');
      reset();
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-onyx-900/15 bg-ivory-100 p-10 sm:p-14"
      >
        <p className="eyebrow text-champagne-600">Thank you</p>
        <p className="display-serif text-3xl sm:text-4xl mt-4 leading-tight">
          Your note is on its way.
        </p>
        <p className="mt-4 text-onyx-900/75">
          We&apos;ll reply within one business day. If your moment is sooner than that,
          call us — the line is below.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-ghost mt-8"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-6 sm:grid-cols-2"
      aria-describedby={status === 'error' ? 'form-error' : undefined}
    >
      {/* Honeypot — hidden from users, catches naive spam bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register('honeypot')}
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <Field label="Name" required error={errors.name}>
        <input
          {...register('name', { required: 'Please tell us your name.' })}
          type="text"
          autoComplete="name"
          className={inputCls(!!errors.name)}
          aria-invalid={!!errors.name}
        />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input
          {...register('email', {
            required: 'We need an email to reply.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "That email doesn't look right.",
            },
          })}
          type="email"
          autoComplete="email"
          className={inputCls(!!errors.email)}
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field label="Brand or company" error={errors.company}>
        <input
          {...register('company')}
          type="text"
          autoComplete="organization"
          className={inputCls(false)}
        />
      </Field>

      <Field label="Service of interest" error={errors.service}>
        <select {...register('service')} className={selectCls()} defaultValue={preselect}>
          <option value="">No preference yet</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Timeline" error={errors.timeline}>
        <select {...register('timeline')} className={selectCls()}>
          <option value="">Select…</option>
          <option>Within 2 weeks</option>
          <option>1 month</option>
          <option>1–3 months</option>
          <option>Exploring</option>
        </select>
      </Field>

      <Field label="Budget range (USD)" error={errors.budget}>
        <select {...register('budget')} className={selectCls()}>
          <option value="">Select…</option>
          <option>Under $10k</option>
          <option>$10k – $25k</option>
          <option>$25k – $75k</option>
          <option>$75k+</option>
          <option>Not sure yet</option>
        </select>
      </Field>

      <Field label="Tell us about the moment you're building" required error={errors.message} className="sm:col-span-2">
        <textarea
          {...register('message', { required: 'A few sentences is plenty.' })}
          rows={6}
          className={inputCls(!!errors.message)}
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Sending…' : 'Send inquiry'}
        </button>
        <p className="text-xs text-onyx-900/55 max-w-md">
          By submitting, you agree to be contacted about your inquiry. We never share
          your details.
        </p>
      </div>

      {status === 'error' && (
        <p
          id="form-error"
          role="alert"
          className="sm:col-span-2 text-sm text-plum-700 bg-blush-200/40 border border-plum-700/30 p-4"
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  error?: { message?: string };
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId(label);
  return (
    <label className={`block ${className}`} htmlFor={id}>
      <span className="eyebrow text-onyx-900/60 block mb-3">
        {label}
        {required && <span className="text-plum-700"> *</span>}
      </span>
      {/* Inject id into child input */}
      {wrapWithId(children, id)}
      {error?.message && (
        <span role="alert" className="block mt-2 text-xs text-plum-700">
          {error.message}
        </span>
      )}
    </label>
  );
}

function useId(seed: string) {
  // Simple deterministic id per field (form is short-lived; collisions are unlikely)
  return 'f-' + seed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function wrapWithId(node: React.ReactNode, id: string): React.ReactNode {
  if (!isValidElement(node)) return node;
  return cloneElement(node as React.ReactElement<{ id?: string }>, { id });
}

function inputCls(hasError: boolean) {
  return `block w-full bg-transparent border-0 border-b ${
    hasError ? 'border-plum-700' : 'border-onyx-900/30'
  } focus:border-onyx-900 focus:outline-none focus:ring-0 py-3 text-base placeholder:text-onyx-900/40 transition-colors`;
}
function selectCls() {
  return 'block w-full bg-transparent border-0 border-b border-onyx-900/30 focus:border-onyx-900 focus:outline-none focus:ring-0 py-3 text-base appearance-none transition-colors';
}
