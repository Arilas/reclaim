import { UserInterface } from '@reclaim/user'
import { AuthTokensDto } from '../dtos/AuthTokensDto.js'

export interface AuthTokensProviderInterface {
  generateAuthTokens(user: UserInterface): Promise<AuthTokensDto>
}
