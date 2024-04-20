import { UserInterface } from '@reclaim/user'

export interface PasswordResetProviderInterface {
  requestPasswordReset(user: UserInterface): Promise<string>

  resetPassword(
    user: UserInterface,
    token: string,
    password: string,
  ): Promise<UserInterface>
}
