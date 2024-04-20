import { PasswordStatus } from './enums/PasswordStatus.js'

/**
 * PasswordInterface
 *
 * This interface represents a password entity.
 * Each user will have a one-to-many password entities,
 * but only one password entity will have a status of ACTIVE.
 *
 * This ensures that user cannot re-use the same password for a
 * change password request.
 */
export interface PasswordInterface {
  id: string
  userId: string
  createdAt: Date
  modifiedAt: Date
  password: string
  passwordStatus: PasswordStatus
}
