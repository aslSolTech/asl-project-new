"use client";

import { useMemo, useCallback } from "react";
import { z } from "zod";
import { useAppForm } from "../form";
import { FormRendererProps } from "../types";
import { FieldRenderer } from "./FieldRenderer";
import { cn } from "@/lib/utils";

const GRID_COLS_CLASS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const;

const COL_SPAN_CLASS = {
  1: "col-span-1",
  2: "col-span-1 md:col-span-2",
  3: "col-span-1 md:col-span-3",
  4: "col-span-1 md:col-span-2 lg:col-span-4",
} as const;

export function FormRenderer<T extends Record<string, unknown> = Record<string, unknown>>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  submittingText = "Submitting...",
  submitIcon,
  resetOnSubmit = false,
  gridCols = 1,
  className,
  extraButtons,
  isLoading = false,
}: FormRendererProps<T>) {
  // Memoize initial form values to prevent unnecessary re-computations
  const initialValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((field) => {
      defaults[field.name] = defaultValues?.[field.name as keyof T] ?? field.defaultValue ?? "";
    });
    return defaults as T;
  }, [fields, defaultValues]);

  const form = useAppForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      let submitPayload = value;

      if (schema) {
        const parseResult = schema.safeParse(value);
        if (!parseResult.success) {
          return;
        }
        submitPayload = parseResult.data;
      }

      await onSubmit(submitPayload);

      if (resetOnSubmit) {
        form.reset();
      }
    },
  });

  // Memoized field validation handler
  const validateField = useCallback(
    (fieldName: string, value: unknown, customValidate?: (v: unknown) => string | undefined) => {
      if (customValidate) {
        const customErr = customValidate(value);
        if (customErr) return customErr;
      }

      if (schema && "shape" in schema && schema.shape) {
        const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[fieldName];
        if (fieldSchema) {
          const res = fieldSchema.safeParse(value);
          if (!res.success) {
            return res.error.issues[0]?.message;
          }
        }
      }
      return undefined;
    },
    [schema]
  );

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={cn("space-y-6 w-full", className)}
      >
        <div className={cn("grid gap-4 sm:gap-6", GRID_COLS_CLASS[gridCols])}>
          {fields.map((field) => {
            const span = field.colSpan ? COL_SPAN_CLASS[field.colSpan] : undefined;

            return (
              <div key={field.name} className={span}>
                <form.AppField
                  name={field.name}
                  validators={{
                    onChange: ({ value }) => validateField(field.name, value, field.validate),
                  }}
                >
                  {() => <FieldRenderer field={field} disabled={isLoading} />}
                </form.AppField>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <form.SubscribeButton
            label={submitLabel}
            loadingLabel={submittingText}
            icon={submitIcon}
            isLoading={isLoading}
            disabled={isLoading}
            className="min-w-[120px]"
          />
          {extraButtons}
        </div>
      </form>
    </form.AppForm>
  );
}

export default FormRenderer;