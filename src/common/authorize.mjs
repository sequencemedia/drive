/**
 *  @typedef {import('google-auth-library').JWT} JWT
 */

import {
  google
} from 'googleapis'

export function getClientEmail ({
  client_email: clientEmail = null
}) {
  return clientEmail
}

export function getPrivateKey ({
  private_key: privateKey = null
}) {
  return privateKey
}

/**
 *  Authorise using a Service Account (and return a JWT client)
 *
 *  @param {Record<PropertyKey, string | undefined>} keyFile
 *  @param {string[]} scopes
 *  @returns {JWT}
 */
export default async function authorize (keyFile, scopes = []) {
  if (!keyFile) throw new Error('A key file is required')

  const authClient = new google.auth.JWT(
    getClientEmail(keyFile),
    null,
    getPrivateKey(keyFile),
    scopes
  )

  await authClient.authorize()

  return authClient
}
