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
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "@/components/ui/combobox";
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
  readonly options?: unknown;
  readonly value?: unknown;

  readonly onChange?: (value: unknown) => void;
  readonly onBlur?: () => void;
  readonly className?: string;
  readonly wrapperClassName?: string;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
}



function transformText(val: string, textTransform?: "uppercase" | "lowercase" | "capitalize"): string {
  if (textTransform === "uppercase") return val.toUpperCase();
  if (textTransform === "lowercase") return val.toLowerCase();
  if (textTransform === "capitalize") return val.replace(/\b\w/g, (c) => c.toUpperCase());
  return val;
}

interface FieldWrapperProps {
  readonly fieldId: string;
  readonly label?: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly helperText?: string;
  readonly description?: string;
  readonly wrapperClassName?: string;
  readonly children: React.ReactNode;
}

function FieldWrapper({
  fieldId,
  label,
  required,
  error,
  helperText,
  description,
  wrapperClassName,
  children,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
      {label && (
        <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
      {!error && (helperText || description) && (
        <p className="text-xs text-muted-foreground mt-0.5">{helperText || description}</p>
      )}
    </div>
  );
}

interface FieldTypeComponentProps extends TextFieldProps {
  readonly fieldId: string;
  readonly wrapperProps: Omit<FieldWrapperProps, "children">;
}

function TextareaField({
  fieldId,
  name,
  placeholder,
  required,
  disabled,
  readOnly,
  rows = 3,
  value,
  onChange,
  onBlur,
  className,
  textTransform,
  wrapperProps,
  forwardedRef,
  ...props
}: Readonly<FieldTypeComponentProps & { readonly forwardedRef: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement> }>) {
  return (
    <FieldWrapper {...wrapperProps}>
      <Textarea
        id={fieldId}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        value={typeof value === "string" || typeof value === "number" ? value : ""}
        onChange={(e) => onChange?.(transformText(e.target.value, textTransform))}
        onBlur={() => {
          if (typeof value === "string") {
            const trimmed = value.trim();
            if (trimmed !== value) onChange?.(trimmed);
          }
          onBlur?.();
        }}
        ref={forwardedRef as React.Ref<HTMLTextAreaElement>}
        className={cn(wrapperProps.error && "border-destructive focus-visible:ring-destructive", className)}
        style={{ textTransform, ...props.style }}
      />
    </FieldWrapper>
  );
}

function normalizeOptions(options?: unknown): SelectOption[] {
  if (!Array.isArray(options)) return [];
  return options.map((opt) => {
    if (typeof opt === "object" && opt !== null && "label" in opt) {
      const optionObj = opt as { label: unknown; value?: unknown };
      return {
        label: String(optionObj.label),
        value: optionObj.value !== undefined ? optionObj.value : String(optionObj.label),
      };
    }
    return {
      label: String(opt),
      value: String(opt),
    };
  });
}


function SelectField({
  fieldId,
  placeholder,
  disabled,
  options: rawOptions = [],
  value,
  onChange,
  className,
  wrapperProps,
}: Readonly<FieldTypeComponentProps>) {
  const options = normalizeOptions(rawOptions);
  const placeholderText = placeholder || "Select option";
  const stringifiedOptions = [
    { value: "", label: placeholderText },
    ...options.map((opt) => ({
      ...opt,
      value: String(opt.value),
    })),
  ];

  return (
    <FieldWrapper {...wrapperProps}>
      <Select
        items={stringifiedOptions}
        value={value !== undefined && value !== null ? String(value) : ""}
        onValueChange={(val) => {
          if (val === "") {
            onChange?.("");
            return;
          }
          const matchingOption = options.find((opt) => String(opt.value) === val);
          onChange?.(matchingOption ? matchingOption.value : val);
        }}
        disabled={disabled}
      >
        <SelectTrigger id={fieldId} className={cn(wrapperProps.error && "border-destructive", className)}>
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
    </FieldWrapper>
  );
}

function ComboboxField({
  fieldId,
  placeholder,
  disabled,
  options: rawOptions = [],
  value,
  onChange,
  className,
  wrapperProps,
}: Readonly<FieldTypeComponentProps>) {
  const options = normalizeOptions(rawOptions);
  const selectedOption = options.find((opt) => String(opt.value) === String(value)) || null;

  return (
    <FieldWrapper {...wrapperProps}>
      <Combobox
        items={options}
        itemToStringValue={(item: SelectOption) => (item ? item.label : "")}
        value={selectedOption}
        onValueChange={(item: SelectOption | null) => {
          onChange?.(item ? item.value : "");
        }}
        disabled={disabled}
      >
        <ComboboxInput
          id={fieldId}
          placeholder={placeholder || "Search or select..."}
          showClear
          className={cn(wrapperProps.error && "border-destructive focus-within:ring-destructive", className)}
        />
        <ComboboxContent align="start" className="w-(--anchor-width)">
          <ComboboxList>
            {options.map((opt) => (
              <ComboboxItem key={String(opt.value)} value={opt}>
                {opt.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No options found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </FieldWrapper>
  );
}

function ComboboxMultiField({
  fieldId,
  placeholder,
  disabled,
  options: rawOptions = [],
  value,
  onChange,
  className,
  wrapperProps,
}: Readonly<FieldTypeComponentProps>) {
  const options = normalizeOptions(rawOptions);
  const anchorRef = useComboboxAnchor();
  const currentValues = Array.isArray(value) ? (value as unknown[]) : [];
  const selectedOptions = options.filter(
    (opt) => currentValues.includes(opt.value) || currentValues.includes(String(opt.value))
  );


  return (
    <FieldWrapper {...wrapperProps}>
      <Combobox
        multiple
        items={options}
        itemToStringValue={(item: SelectOption) => (item ? item.label : "")}
        value={selectedOptions}
        onValueChange={(selectedItems: SelectOption[]) => {
          onChange?.(selectedItems.map((item) => item.value));
        }}
        disabled={disabled}
      >
        <ComboboxChips ref={anchorRef} className={cn(wrapperProps.error && "border-destructive", className)}>
          {selectedOptions.map((opt) => (
            <ComboboxChip key={String(opt.value)}>
              {opt.label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput id={fieldId} placeholder={selectedOptions.length === 0 ? (placeholder || "Search...") : ""} />
        </ComboboxChips>
        <ComboboxContent anchor={anchorRef} align="start" className="w-(--anchor-width)">
          <ComboboxList>
            {options.map((opt) => (
              <ComboboxItem key={String(opt.value)} value={opt}>
                {opt.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No options found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </FieldWrapper>
  );
}

function CheckboxField({
  fieldId,
  label,
  required,
  error,
  helperText,
  description,
  disabled,
  value,
  onChange,
  className,
  wrapperClassName,
}: Readonly<FieldTypeComponentProps>) {
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
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
      {!error && (helperText || description) && (
        <p className="text-xs text-muted-foreground mt-0.5">{helperText || description}</p>
      )}
    </div>
  );
}

function SwitchField({
  fieldId,
  label,
  required,
  error,
  helperText,
  description,
  disabled,
  value,
  onChange,
  className,
  wrapperClassName,
}: Readonly<FieldTypeComponentProps>) {
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
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
      {!error && (helperText || description) && (
        <p className="text-xs text-muted-foreground mt-0.5">{helperText || description}</p>
      )}
    </div>
  );
}

function StandardInputField({
  fieldId,
  name,
  type = "text",
  placeholder,
  disabled,
  readOnly,
  value,
  onChange,
  onBlur,
  className,
  textTransform,
  wrapperProps,
  forwardedRef,
  ...props
}: Readonly<FieldTypeComponentProps & { readonly forwardedRef: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement> }>) {
  return (
    <FieldWrapper {...wrapperProps}>
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
          const val = transformText(e.target.value, textTransform);
          if (type === "number") {
            onChange(val === "" ? undefined : Number(val));
          } else {
            onChange(val);
          }
        }}
        onBlur={() => {
          if (typeof value === "string") {
            const trimmed = value.trim();
            if (trimmed !== value) onChange?.(trimmed);
          }
          onBlur?.();
        }}
        ref={forwardedRef as React.Ref<HTMLInputElement>}
        className={cn(wrapperProps.error && "border-destructive focus-visible:ring-destructive", className)}
        style={{ textTransform, ...props.style }}
        {...(props as React.ComponentProps<"input">)}
      />
    </FieldWrapper>
  );
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (props, ref) => {
    const id = useId();
    const fieldId = `${props.name}-${id}`;

    const wrapperProps = {
      fieldId,
      label: props.label,
      required: props.required,
      error: props.error,
      helperText: props.helperText,
      description: props.description,
      wrapperClassName: props.wrapperClassName,
    };

    const fieldComponentProps: FieldTypeComponentProps = {
      ...props,
      fieldId,
      wrapperProps,
    };

    switch (props.type) {
      case "textarea":
        return <TextareaField {...fieldComponentProps} forwardedRef={ref} />;
      case "select":
        return <SelectField {...fieldComponentProps} />;
      case "combobox":
        return <ComboboxField {...fieldComponentProps} />;
      case "combobox-multi":
        return <ComboboxMultiField {...fieldComponentProps} />;
      case "checkbox":
        return <CheckboxField {...fieldComponentProps} />;
      case "switch":
        return <SwitchField {...fieldComponentProps} />;
      case "file":
        return (
          <div className={cn("w-full", props.wrapperClassName)}>
            <UploadField
              label={props.label}
              variant="avatar"
              description={props.description || props.helperText}
              required={props.required}
              disabled={props.disabled}
              error={props.error}
              accept={props.accept as string}
              value={props.value as File | File[] | null}
              onChange={props.onChange}
              onBlur={props.onBlur}
              className={props.className}
            />
          </div>
        );
      default:
        return <StandardInputField {...fieldComponentProps} forwardedRef={ref} />;
    }
  }
);

FormField.displayName = "FormField";
