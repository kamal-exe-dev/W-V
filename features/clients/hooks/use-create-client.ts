'use client'

import { useActionState } from 'react'
import { createClientAction } from '../actions/client.actions'
import type { ActionState } from '@/types/api'

const initialState: ActionState = {}

/** Wraps the create-client server action in React 19's useActionState for form components. */
export function useCreateClient() {
  const [state, formAction, pending] = useActionState(createClientAction, initialState)
  return { state, formAction, pending }
}
