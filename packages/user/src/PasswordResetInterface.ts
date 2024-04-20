export interface PasswordResetInterface {
  id: string
  userId: string
  createdAt: Date
  usedAt: Date | null
  token: string
  expiresAt: Date
}
