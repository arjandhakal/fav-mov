import { type Static, Type } from '@sinclair/typebox'

/** Login Schemas */
export const LoginBodySchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
})

export type LoginBodySchemaType = Static<typeof LoginBodySchema>
