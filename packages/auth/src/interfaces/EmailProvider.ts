import { EmailInterface, UserInterface } from '@reclaim/user'

export interface EmailProviderInterface {
  checkEmailExists(email: string): Promise<boolean>
  getUserEmails(user: UserInterface): Promise<EmailInterface[]>
  getPrimaryEmail(user: UserInterface): Promise<EmailInterface>
  createEmail(user: UserInterface, email: string): Promise<EmailInterface>
}
