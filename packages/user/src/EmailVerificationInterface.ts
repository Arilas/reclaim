import { EmailVerificationStatus } from './enums/EmailVerificationStatus.js'

/**
 * EmailVerificationInterface
 *
 * This interface represents an email verification entity.
 *
 * Each user will have a separate email verification entity for each email entity.
 * This ensures that user can verify multiple emails.
 */
export interface EmailVerificationInterface {
  id: string
  userId: string
  emailId: string
  createdAt: Date
  expiresAt: Date
  token: string
  tries: number
  status: EmailVerificationStatus
}
