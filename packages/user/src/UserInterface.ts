import { UserStatus } from './enums/UserStatus.js'

export interface UserInterface {
  id: string
  status: UserStatus
}
