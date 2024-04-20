import { AuthProviderInterface } from '../interfaces/AuthProvider.js'
import { UserProviderInterface } from '../interfaces/UserProvider.js'
import { CredentialsDto } from '../dtos/CredentialsDto.js'
import { PasswordProviderInterface } from '../interfaces/PasswordProvider.js'
import { EmailVerificationProviderInterface } from '../interfaces/EmailVerificationProvider.js'
import { UserInterface, UserStatus } from '@reclaim/user'
import { PasswordResetProviderInterface } from '../interfaces/PasswordResetProvider.js'
import { CreateUserDto } from '../dtos/CreateUserDto.js'
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExists.js'
import { InvalidCredentialsException } from '../exceptions/InvalidCredentials.js'
import { UserNotFoundException } from '../exceptions/UserNotFound.js'
import { AuthTokensProviderInterface } from '../interfaces/AuthTokensProvider.js'
import { UserNotActivatedException } from '../exceptions/UserNotActivated.js'
import { EmailProviderInterface } from '../interfaces/EmailProvider.js'

export class AuthProvider implements AuthProviderInterface {
  constructor(
    private authTokensProvider: AuthTokensProviderInterface,
    private userProvider: UserProviderInterface,
    private emailProvider: EmailProviderInterface,
    private passwordProvider: PasswordProviderInterface,
    private emailVerificationProvider: EmailVerificationProviderInterface,
    private passwordResetProvider: PasswordResetProviderInterface,
  ) {}

  async authenticate(credentials: CredentialsDto) {
    const user = await this.userProvider.getUserByPrimaryEmail(
      credentials.email,
    )
    if (!user) {
      throw new InvalidCredentialsException()
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new UserNotActivatedException()
    }
    const res = await this.passwordProvider.comparePassword(user, credentials)
    if (!res) {
      throw new InvalidCredentialsException()
    }
    return this.authTokensProvider.generateAuthTokens(user)
  }

  async createUser(rawUser: CreateUserDto) {
    const existingUser = await this.emailProvider.checkEmailExists(
      rawUser.email,
    )
    if (existingUser) {
      throw new UserAlreadyExistsException()
    }
    const newUser = await this.userProvider.createUser(rawUser)
    await this.passwordProvider.storePassword(newUser, rawUser.password)
    await this.emailProvider.createEmail(newUser, rawUser.email)
    return newUser
  }

  async verifyEmail(token: string) {
    const user = await this.userProvider.getUserByEmailVerificationToken(token)
    if (!user) {
      throw new UserNotFoundException()
    }
    return this.emailVerificationProvider.verifyEmail(user, token)
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userProvider.getUserByPasswordResetToken(token)
    if (!user) {
      throw new UserNotFoundException()
    }
    await this.passwordResetProvider.resetPassword(user, token, password)
    return user
  }

  async requestEmailVerification(user: UserInterface, email: string) {
    return this.emailVerificationProvider.requestEmailVerification(user, email)
  }

  async requestPasswordReset(email: string) {
    const user = await this.userProvider.getUserByPrimaryEmail(email)
    if (!user) {
      throw new UserNotFoundException()
    }
    return this.passwordResetProvider.requestPasswordReset(user)
  }
}
