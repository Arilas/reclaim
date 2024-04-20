import { EmailVerificationInterface, UserInterface } from '@reclaim/user'

export interface EmailVerificationProviderInterface {
  verifyEmail(user: UserInterface, token: string): Promise<UserInterface>

  requestEmailVerification(user: UserInterface, email: string): Promise<string>
}
