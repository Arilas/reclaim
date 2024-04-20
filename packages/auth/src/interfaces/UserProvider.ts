import { UserInterface } from '@reclaim/user'
import { CreateUserDto } from '../dtos/CreateUserDto.js'

export interface UserProviderInterface {
  getUserById(userId: string): Promise<UserInterface | null>

  getUserByPrimaryEmail(email: string): Promise<UserInterface | null>

  getUserByEmailVerificationToken(token: string): Promise<UserInterface | null>

  getUserByPasswordResetToken(token: string): Promise<UserInterface | null>

  createUser(user: CreateUserDto): Promise<UserInterface>
}
