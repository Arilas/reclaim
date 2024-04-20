import { EmailStatus } from './enums/EmailStatus.js'

/**
 * EmailInterface
 *
 * This interface represents an email entity.
 *
 * Each user will have a one-to-many email entities,
 * sometimes a user will have multiple email entities
 * but only one email entity will have a status of ACTIVE,
 * which will be used for communication and authentication purposes.
 *
 * Other emails can be used for other purposes.
 */
export interface EmailInterface {
  id: string
  userId: string
  createdAt: Date
  email: string
  emailStatus: EmailStatus
}
