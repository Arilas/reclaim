import { ReclaimException } from '@reclaim/core'

export class InvalidCredentialsException extends ReclaimException {
  constructor() {
    super('Invalid credentials', 401)
  }
}
