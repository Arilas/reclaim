import { UserInterface } from '@reclaim/user'
import { CredentialsDto } from '../dtos/CredentialsDto.js'

export interface PasswordProviderInterface {
  storePassword(user: UserInterface, password: string): Promise<void>
  comparePassword(
    user: UserInterface,
    credentials: CredentialsDto,
  ): Promise<UserInterface | null>
}
