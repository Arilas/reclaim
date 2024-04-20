import {
  EmailVerificationInterface,
  PasswordResetInterface,
  UserInterface,
} from '@reclaim/user'
import { CredentialsDto } from '../dtos/CredentialsDto.js'
import { CreateUserDto } from '../dtos/CreateUserDto.js'
import { AuthTokensDto } from '../dtos/AuthTokensDto.js'

export interface AuthProviderInterface {
  authenticate(credentials: CredentialsDto): Promise<AuthTokensDto>

  createUser(user: CreateUserDto): Promise<UserInterface>

  verifyEmail(token: string): Promise<UserInterface>

  resetPassword(token: string, password: string): Promise<UserInterface>

  requestEmailVerification(user: UserInterface, email: string): Promise<string>

  requestPasswordReset(email: string): Promise<string>
}
