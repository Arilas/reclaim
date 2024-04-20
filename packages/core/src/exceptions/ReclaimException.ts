export class ReclaimException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
  ) {
    super(message)
  }
}
