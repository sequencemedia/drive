import type { JWT } from 'google-auth-library'

export function getClientEmail (keyFile: KeyFileType): string | null

export function getPrivateKey (keyFile: KeyFileType): string | null

/**
 * Authorise using a Service Account (and return a JWT client)
 */
export default function authorize (keyFile: KeyFileType, scopes?: string[]): Promise<JWT>
