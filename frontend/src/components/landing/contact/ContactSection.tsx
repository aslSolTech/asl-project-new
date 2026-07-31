'use client';

import { useAppForm } from '@/components/shared/form/form';
import { contactSchema } from '@/validations';
import { CONTACT_CARDS, CONTACT_DEFAULT_VALUES, CONTACT_SERVICES } from '@/constants';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

// Import Shadcn UI Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Services = {
  readonly message?: string
}


function FieldError({ message }: Services) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs text-destructive mt-1 flex items-center gap-1 font-medium"
        >
          <span>⚠</span> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = CONTACT_DEFAULT_VALUES;

  const handleSubmit = async ({ value }: { value: typeof defaultValues }) => {
    // Validate with Zod before submitting
    const result = contactSchema.safeParse(value);
    if (!result.success) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const form = useAppForm({
    defaultValues,
    onSubmit: handleSubmit,
  });

  const validateField = <T,>(schema: z.ZodType<T>, value: T) => {
    const result = schema.safeParse(value);
    if (!result.success) return result.error.issues[0]?.message;
    return undefined;
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="h-20 w-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Message Sent!</h2>
            <p className="text-muted-foreground">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-4 px-6 py-2.5 rounded-md text-sm font-medium"
            >
              Send another message
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Talk to Our{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Payzones Team
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Have questions about joining? We&apos;re here 24×7. Fill the form and our team will contact you shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: 2x2 Grid of Custom Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ y: -4 }}
                className="product-card w-full rounded-xl shadow-xl overflow-hidden z-[10] relative cursor-pointer py-8 px-6 bg-card border border-border flex flex-col justify-between gap-6 transition-all duration-300 group hover:shadow-2xl hover:border-primary/40 block"
              >
                {/* Background Rotated Star Polygon SVG */}
                <div className="absolute -right-[36%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150 pointer-events-none">
                  <div className="flex gap-1">
                    <svg
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="fill-muted/40 dark:fill-secondary/20 rotate-[24deg]"
                      height="180"
                      width="180"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>

                {/* Animated Background Circle overlay */}
                <div className="absolute rounded-full bg-primary/10 dark:bg-primary/20 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300 pointer-events-none" />

                <div className="inline-flex gap-2.5 items-center z-30">
                  <div className="p-2.5 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Content Header */}
                <div className="para uppercase text-left leading-none z-30 space-y-1.5">
                  <p className="text-muted-foreground font-semibold text-xs tracking-wider">{label}</p>
                  <p className="font-bold text-base sm:text-lg tracking-tight text-foreground break-words normal-case">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="product-card w-full rounded-xl shadow-xl overflow-hidden z-[10] relative p-6 md:p-8 bg-card border border-border transition-all duration-300 group hover:shadow-2xl hover:border-primary/40">
              
              {/* Background Rotated Star Polygon SVG */}
              <div className="absolute -left-[25%] -top-[10%] group-hover:rotate-12 transition-all duration-500 group-hover:scale-125 pointer-events-none z-0">
                <div className="flex gap-1">
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="fill-muted/30 dark:fill-secondary/20 rotate-[24deg]"
                    height="280"
                    width="280"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              {/* Animated Background Circle overlay */}
              <div className="absolute rounded-full bg-primary/5 dark:bg-primary/10 z-0 left-1/2 top-[55%] h-[130%] w-[130%] -translate-x-1/2 group-hover:top-[65%] transition-all duration-500 pointer-events-none" />

              {/* Interactive Form Content with Shadcn UI Components */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="relative z-10 space-y-5"
              >
                {/* Name + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <form.Field
                    name="name"
                    validators={{
                      onBlur: ({ value }) =>
                        validateField(contactSchema.shape.name, value),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Rohit Kumar"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-10 rounded-md bg-background"
                        />
                        <FieldError message={field.state.meta.errors[0] as string | undefined} />
                      </div>
                    )}
                  </form.Field>

                  {/* Phone */}
                  <form.Field
                    name="phone"
                    validators={{
                      onBlur: ({ value }) =>
                        validateField(contactSchema.shape.phone, value),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                          Mobile Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-10 rounded-md bg-background"
                        />
                        <FieldError message={field.state.meta.errors[0] as string | undefined} />
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Email */}
                <form.Field
                  name="email"
                  validators={{
                    onBlur: ({ value }) =>
                      validateField(contactSchema.shape.email, value),
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="h-10 rounded-md bg-background"
                      />
                      <FieldError message={field.state.meta.errors[0] as string | undefined} />
                    </div>
                  )}
                </form.Field>

                {/* Service Interest (Shadcn Select) */}
                <form.Field
                  name="service"
                  validators={{
                    onBlur: ({ value }) =>
                      validateField(contactSchema.shape.service, value),
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor="service" className="text-sm font-medium text-foreground">
                        I&apos;m Interested In <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val || "")}
                      >
                        <SelectTrigger id="service" className="w-full h-10 rounded-md bg-background">
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_SERVICES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError message={field.state.meta.errors[0] as string | undefined} />
                    </div>
                  )}
                </form.Field>

                {/* Message (Shadcn Textarea) */}
                <form.Field
                  name="message"
                  validators={{
                    onBlur: ({ value }) =>
                      validateField(contactSchema.shape.message, value),
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Your Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="rounded-md bg-background resize-none min-h-[100px]"
                      />
                      <div className="flex justify-between">
                        <FieldError message={field.state.meta.errors[0] as string | undefined} />
                        <span className="text-xs text-muted-foreground mt-1">
                          {field.state.value.length}/500
                        </span>
                      </div>
                    </div>
                  )}
                </form.Field>

                {/* Submit (Shadcn Button) */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-md text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}