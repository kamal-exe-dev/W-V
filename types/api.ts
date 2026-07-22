/** Shared shape returned by every `useActionState`-driven server action across the app. */
export interface ActionState {
  error?: string
  success?: boolean
}

export interface SelectOption {
  id: string
  name: string
}
