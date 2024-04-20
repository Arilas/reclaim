import { ReclaimException } from '@reclaim/core'

export class UserAlreadyExistsException extends ReclaimException {
  constructor() {
    super('User already exists', 400)
  }
}
