import { ReclaimException } from '@reclaim/core'

export class ResetPasswordTokenNotFoundException extends ReclaimException {
  constructor() {
    super('Reset password token not found', 404)
  }
}
