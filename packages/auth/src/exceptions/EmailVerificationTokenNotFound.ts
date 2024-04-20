import { ReclaimException } from '@reclaim/core'

export class EmailVerificationTokenNotFoundException extends ReclaimException {
  constructor() {
    super('Email verification token not found', 404)
  }
}
