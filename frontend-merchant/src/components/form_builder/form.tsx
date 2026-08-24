import { createFormHook } from '@tanstack/react-form-nextjs';
import { fieldContext, formContext, useFormContext } from './form-context';
import { Button } from '@/components/ui/button';
import { FormField } from './fields/FormFields';
import { Loader2 } from 'lucide-react';

interface SubscribeButtonProps {
  readonly label: string;
  readonly loadingLabel?: string;
  readonly icon?: React.ReactNode;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly className?: string;
}

function SubscribeButton({ label, loadingLabel = "Submitting...", icon, disabled, isLoading, className }: SubscribeButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}>
      {([canSubmit, isSubmitting, isDirty]) => {
        const loading = isSubmitting || Boolean(isLoading);
        return (
          <Button
            type="submit"
            disabled={!canSubmit || !isDirty || loading || disabled}
            className={className}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline-block" />
                {loadingLabel}
              </>
            ) : (
              <>
                {label}
                {icon}
              </>
            )}
          </Button>
        );
      }}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
