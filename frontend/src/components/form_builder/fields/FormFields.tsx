"use client";
import { forwardRef, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldType, SelectOption } from "../types";
import { UploadField } from "./upload";

export type FieldOption = SelectOption;
export type FormFieldType = FieldType;

export interface TextFieldProps extends Omit<React.ComponentProps<"input">, "name" | "type" | "onChange" | "value"> {
  readonly name: string;
  readonly label?: string;
  readonly type?: FormFieldType;
  readonly placeholder?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly rows?: number;
  readonly options?: readonly FieldOption[];
  readonly value?: unknown;
  readonly onChange?: (value: unknown) => void;
  readonly onBlur?: () => void;
  readonly className?: string;
  readonly wrapperClassName?: string;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      error,
      helperText,
      description,
      required,
      disabled,
      readOnly,
      rows = 3,
      options = [],
      value,
      onChange,
      onBlur,
      className,
      wrapperClassName,
      textTransform,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const fieldId = `${name}-${id}`;

    const renderHelperOrError = () => {
      if (error) {
        return <p className="text-xs text-destructive font-medium mt-0.5">{error}</p>;
      }
      if (helperText) {
        return <p className="text-xs text-muted-foreground mt-0.5">{helperText}</p>;
      }
      return null;
    };

    // 1. Textarea Input
    if (type === "textarea") {
      return (
        <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
          {label && (
            <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          <Textarea
            id={fieldId}
            name={name}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => {
              let val = e.target.value;
              if (textTransform === "uppercase") {
                val = val.toUpperCase();
              } else if (textTransform === "lowercase") {
                val = val.toLowerCase();
              } else if (textTransform === "capitalize") {
                val = val.replace(/\b\w/g, (c) => c.toUpperCase());
              }
              onChange?.(val);
            }}
            onBlur={() => {
              if (typeof value === "string") {
                const trimmed = value.trim();
                if (trimmed !== value) {
                  onChange?.(trimmed);
                }
              }
              onBlur?.();
            }}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
            style={{ textTransform, ...props.style }}
          />
          {renderHelperOrError()}
        </div>
      );
    }

    // 2. Select Dropdown Input
    if (type === "select") {
      const placeholderText = placeholder || "Select option";
      const stringifiedOptions = [
        { value: "", label: placeholderText },
        ...options.map((opt) => ({
          ...opt,
          value: String(opt.value),
        })),
      ];
      return (
        <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
          {label && (
            <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
              {label}
              {required && <span className="text-destructive">*</span>}
            </Label>
          )}
          <Select
            items={stringifiedOptions}
            value={value !== undefined && value !== null ? String(value) : ""}
            onValueChange={(val) => {
              if (val === "") {
                onChange?.("");
                return;
              }
              const matchingOption = options.find((opt) => String(opt.value) === val);
              if (matchingOption) {
                onChange?.(matchingOption.value);
              } else {
                onChange?.(val);
              }
            }}
            disabled={disabled}
          >
            <SelectTrigger id={fieldId} className={cn(error && "border-destructive", className)}>
              <SelectValue placeholder={placeholderText} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="" className="text-muted-foreground">
                {placeholderText}
              </SelectItem>
              {options.map((opt) => (
                <SelectItem key={String(opt.value)} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {renderHelperOrError()}
        </div>
      );
    }

    // 3. Single Checkbox Input
    if (type === "checkbox") {
      return (
        <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={fieldId}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange?.(Boolean(checked))}
              disabled={disabled}
              className={className}
            />
            {label && (
              <Label htmlFor={fieldId} className="text-sm font-medium text-foreground cursor-pointer">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
          </div>
          {renderHelperOrError()}
        </div>
      );
    }

    // 4. Switch Toggle Input
    if (type === "switch") {
      return (
        <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
          <div className="flex items-center justify-between gap-4 py-1">
            {label && (
              <Label htmlFor={fieldId} className="text-sm font-medium text-foreground cursor-pointer">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            <Switch
              id={fieldId}
              checked={Boolean(value)}
              onCheckedChange={(checked) => onChange?.(Boolean(checked))}
              disabled={disabled}
              className={className}
            />
          </div>
          {renderHelperOrError()}
        </div>
      );
    }

    // 5. File Upload Input
    if (type === "file") {
      return (
        <div className={cn("w-full", wrapperClassName)}>
          <UploadField
            label={label}
            variant={"avatar"}
            description={description || helperText}
            required={required}
            disabled={disabled}
            error={error}
            accept={props.accept as string}
            value={value as File | File[] | null}
            onChange={onChange}
            onBlur={onBlur}
            className={className}
          />
        </div>
      );
    }

    // 6. Standard Inputs (text, email, password, number, tel, url, date)
    return (
      <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
        {label && (
          <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Input
          id={fieldId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          value={typeof value === "string" || typeof value === "number" ? value : ""}
          onChange={(e) => {
            if (!onChange) return;
            let val = e.target.value;
            if (textTransform === "uppercase") {
              val = val.toUpperCase();
            } else if (textTransform === "lowercase") {
              val = val.toLowerCase();
            } else if (textTransform === "capitalize") {
              val = val.replace(/\b\w/g, (c) => c.toUpperCase());
            }
            if (type === "number") {
              onChange(val === "" ? undefined : Number(val));
            } else {
              onChange(val);
            }
          }}
          onBlur={() => {
            if (typeof value === "string") {
              const trimmed = value.trim();
              if (trimmed !== value) {
                onChange?.(trimmed);
              }
            }
            onBlur?.();
          }}
          ref={ref as React.Ref<HTMLInputElement>}
          className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
          style={{ textTransform, ...props.style }}
          {...(props as React.ComponentProps<"input">)}
        />
        {renderHelperOrError()}
      </div>
    );
  }
);

FormField.displayName = "FormField";
