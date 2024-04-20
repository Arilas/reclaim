import { ReclaimException } from '@reclaim/core'

export class UserNotActivatedException extends ReclaimException {
  constructor() {
    super('User not activated', 403)
  }
}
