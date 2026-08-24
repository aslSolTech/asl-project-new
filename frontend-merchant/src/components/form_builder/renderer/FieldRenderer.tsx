"use client";

import { FormFieldConfig } from "../types";
import { FormField } from "../fields/FormFields";
import { useFieldContext } from "../form-context";

export interface FieldRendererProps {
  readonly field: FormFieldConfig;
  readonly disabled?: boolean;
}

export function FieldRenderer({ field, disabled }: FieldRendererProps) {
  const fieldContext = useFieldContext();

  const value = fieldContext.state.value;
  const error = fieldContext.state.meta.errors.join(", ");
  const handleChange = fieldContext.handleChange;
  const handleBlur = fieldContext.handleBlur;

  return (
    <FormField
      name={field.name}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      helperText={field.helperText}
      required={field.required}
      disabled={disabled || field.disabled}
      readOnly={field.readOnly}
      className={field.className}
      wrapperClassName={field.wrapperClassName}
      accept={field.accept}
      options={field.options}
      rows={field.rows}
      error={error}
      value={value}
      onChange={(val) => handleChange(val)}
      onBlur={handleBlur}
    />
  );
}
