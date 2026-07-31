import { createFormHook } from '@tanstack/react-form-nextjs'
// import { lazy } from 'react'
import { fieldContext, formContext, useFormContext } from './form-context'
import { Button } from '@/components/ui/button'

// const TextField = lazy(() => import('../components/text-fields.tsx'))  

interface SubScribeButtonPros {
  readonly label: string  
}

function SubscribeButton({ label }: SubScribeButtonPros) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    // TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})