import { ReclaimException } from '@reclaim/core'

export class UserNotFoundException extends ReclaimException {
  constructor() {
    super('User not found', 404)
  }
}
