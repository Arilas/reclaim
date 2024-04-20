import { ReclaimException } from '@reclaim/core'

export class EmailNotFoundException extends ReclaimException {
  constructor() {
    super('Email not found', 404)
  }
}
