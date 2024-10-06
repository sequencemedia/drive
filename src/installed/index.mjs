/**
 * @typedef {import('google-auth-library').OAuth2Client} OAuth2Client
 * @typedef {import('google-auth-library').JWTInput} UserRefreshClient
 */

import {
  readFile,
  writeFile
} from 'fs/promises'
import {
  authenticate
} from '@google-cloud/local-auth'
import {
  google
} from 'googleapis'

import getCredentials, {
  CREDENTIALS_PATH
} from './getCredentials.mjs'

// If modifying these scopes, delete user-refresh-client.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly'
]

// The file user-refresh-client.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const USER_REFRESH_CLIENT_PATH = './user-refresh-client.json'

/**
 * Deserialises `UserRefreshClient` from a file
 *
 * @return {Promise<UserRefreshClient | null>}
 */
async function getUserRefreshClient () {
  try {
    const fileData = await readFile(USER_REFRESH_CLIENT_PATH)
    return JSON.parse(fileData)
  } catch {
    return null
  }
}

/**
 * Serializes `UserRefreshClient` to a file
 *
 * @param {UserRefreshClient} userRefreshClient
 * @return {Promise<void>}
 */
async function setUserRefreshClient (userRefreshClient) {
  const fileData = JSON.stringify(userRefreshClient)
  await writeFile(USER_REFRESH_CLIENT_PATH, fileData)
}

/**
 * Transforms `UserRefreshClient` to `OAuth2Client`
 *
 * @param {UserRefreshClient} userRefreshClient
 * @returns {OAuth2Client}
 */
function toAuthClient (userRefreshClient) {
  return (
    google.auth.fromJSON(userRefreshClient)
  )
}

/**
 * Transforms `OAuth2Client` to `UserRefreshClient`
 *
 * @param {OAuth2Client} authClient
 * @return {Promise<UserRefreshClient>}
 */
async function toUserRefreshClient (credentials, authClient) {
  const {
    client_id: clientId,
    client_secret: clientSecret
  } = credentials

  const {
    credentials: {
      refresh_token: refreshToken
    }
  } = authClient

  return {
    type: 'authorized_user',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken
  }
}

/**
 * Load or request or authorization to call APIs.
 *
 * @return {OAuth2Client}
 */
async function authorize () {
  const userRefreshClient = await getUserRefreshClient()
  if (userRefreshClient) return toAuthClient(userRefreshClient)

  const authClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH
  })

  await setUserRefreshClient(await toUserRefreshClient(await getCredentials(), authClient))

  return authClient
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles (authClient) {
  try {
    const drive = google.drive({ version: 'v3', auth: authClient })
    const {
      data: {
        files = []
      }
    } = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)'
    })

    if (files.length === 0) {
      console.log('No files.')
      return
    }

    console.table(files)
  } catch (e) {
    console.error(e)
  }
}

authorize().then(listFiles).catch(console.error)
