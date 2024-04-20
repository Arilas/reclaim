import {
  describe,
  beforeEach,
  it,
  vi,
  expect,
  Mock,
  ArgumentsType,
  Mocked,
} from 'vitest'
import { AuthProvider } from '../AuthProvider.js'
import { AuthTokensProviderInterface } from '../../interfaces/AuthTokensProvider.js'
import { UserProviderInterface } from '../../interfaces/UserProvider.js'
import { PasswordProviderInterface } from '../../interfaces/PasswordProvider.js'
import { EmailVerificationProviderInterface } from '../../interfaces/EmailVerificationProvider.js'
import { PasswordResetProviderInterface } from '../../interfaces/PasswordResetProvider.js'
import { UserStatus } from '@reclaim/user'
import { EmailProviderInterface } from '../../interfaces/EmailProvider.js'

describe('AuthProvider', () => {
  let authProvider: AuthProvider
  let authTokensProvider: Mocked<AuthTokensProviderInterface>
  let userProvider: Mocked<UserProviderInterface>
  let emailProvider: Mocked<EmailProviderInterface>
  let passwordProvider: Mocked<PasswordProviderInterface>
  let emailVerificationProvider: Mocked<EmailVerificationProviderInterface>
  let passwordResetProvider: Mocked<PasswordResetProviderInterface>
  beforeEach(() => {
    authTokensProvider = {
      generateAuthTokens: vi.fn(),
    }
    userProvider = {
      getUserById: vi.fn(),
      createUser: vi.fn(),
      getUserByPrimaryEmail: vi.fn(),
      getUserByEmailVerificationToken: vi.fn(),
      getUserByPasswordResetToken: vi.fn(),
    }
    emailProvider = {
      checkEmailExists: vi.fn(),
      createEmail: vi.fn(),
      getUserEmails: vi.fn(),
      getPrimaryEmail: vi.fn(),
    }
    passwordProvider = {
      storePassword: vi.fn(),
      comparePassword: vi.fn(),
    }
    emailVerificationProvider = {
      verifyEmail: vi.fn(),
      requestEmailVerification: vi.fn(),
    }
    passwordResetProvider = {
      resetPassword: vi.fn(),
      requestPasswordReset: vi.fn(),
    }
    authProvider = new AuthProvider(
      authTokensProvider,
      userProvider,
      emailProvider,
      passwordProvider,
      emailVerificationProvider,
      passwordResetProvider,
    )
  })

  it('should be defined', async () => {
    expect(authProvider).toBeDefined()
  })

  it('should authenticate', async () => {
    const credentials = { email: 'test@gmail.com', password: 'password' }
    userProvider.getUserByPrimaryEmail.mockResolvedValueOnce({
      id: 'test',
      status: UserStatus.ACTIVE,
    })
    passwordProvider.comparePassword.mockResolvedValueOnce({
      id: 'test',
      status: UserStatus.ACTIVE,
    })
    authTokensProvider.generateAuthTokens.mockResolvedValueOnce({
      accessToken: 'test',
      refreshToken: 'test',
    })

    const res = await authProvider.authenticate(credentials)
    expect(res).toEqual({ accessToken: 'test', refreshToken: 'test' })
    expect(userProvider.getUserByPrimaryEmail).toHaveBeenCalledWith(
      credentials.email,
    )
    expect(passwordProvider.comparePassword).toHaveBeenCalledWith(
      { id: 'test', status: UserStatus.ACTIVE },
      credentials,
    )
    expect(authTokensProvider.generateAuthTokens).toHaveBeenCalledWith({
      id: 'test',
      status: UserStatus.ACTIVE,
    })
  })

  it('should throw invalid credentials exception', async () => {
    const credentials = { email: 'test@gmail.com', password: 'password' }
    userProvider.getUserByPrimaryEmail.mockResolvedValue(null)
    await expect(authProvider.authenticate(credentials)).rejects.toThrow(
      'Invalid credentials',
    )
  })

  it('should throw user not activated exception', async () => {
    const credentials = { email: 'tes@gmail.com', password: 'password' }
    userProvider.getUserByPrimaryEmail.mockResolvedValueOnce({
      id: 'test',
      status: UserStatus.INACTIVE,
    })
    await expect(authProvider.authenticate(credentials)).rejects.toThrow(
      'User not activated',
    )
  })

  it('should throw invalid credentials exception', async () => {
    const credentials = { email: 'test@gmail.com', password: 'password' }
    userProvider.getUserByPrimaryEmail.mockResolvedValueOnce({
      id: 'test',
      status: UserStatus.ACTIVE,
    })
    passwordProvider.comparePassword.mockResolvedValueOnce(null)
    await expect(authProvider.authenticate(credentials)).rejects.toThrow(
      'Invalid credentials',
    )
  })

  it('should create user', async () => {
    const user = { email: 'test@gmail.com', password: 'password' }
    emailProvider.checkEmailExists.mockResolvedValueOnce(false)
    userProvider.createUser.mockResolvedValueOnce({
      id: 'test',
      status: UserStatus.INACTIVE,
    })
    const res = await authProvider.createUser(user)
    expect(res).toEqual({ id: 'test', status: UserStatus.INACTIVE })
    expect(emailProvider.checkEmailExists).toHaveBeenCalledWith(user.email)
    expect(userProvider.createUser).toHaveBeenCalledWith(user)
    expect(passwordProvider.storePassword).toHaveBeenCalledWith(
      { id: 'test', status: UserStatus.INACTIVE },
      user.password,
    )
    expect(emailProvider.createEmail).toHaveBeenCalledWith(
      { id: 'test', status: UserStatus.INACTIVE },
      user.email,
    )
  })

  it('should throw user already exists exception', async () => {
    const user = { email: 'test@gmail.com', password: 'password' }
    emailProvider.checkEmailExists.mockResolvedValueOnce(true)
    await expect(authProvider.createUser(user)).rejects.toThrow(
      'User already exists',
    )
  })
})
