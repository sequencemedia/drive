/**
 * @typedef {import('google-auth-library').OAuth2Client} AuthClient
 */

import debug from 'debug'

import {
  google
} from 'googleapis'

import {
  GOOGLE_DRIVE_VERSION
} from '#common/config'

import {
  hasErrorCode,
  getErrorCode,
  getErrorMessage
} from '#common/error'

import authorize from '#common/authorize'

const SCOPES = [
  'https://www.googleapis.com/auth/drive'
]

const log = debug('@sequencemedia/drive/list')
const error = debug('@sequencemedia/drive/list:error')

log('`@sequencemedia/drive` is awake')

/**
 * Get a list of the JSON files from Google Drive
 *
 * @param {string} driveId Drive identifier
 * @param {AuthClient} authClient An authorised OAuth2 client
 * @returns {Promise<{id: string, name: string}[]>}
 */
async function getJsonFileList (driveId, authClient) {
  try {
    const drive = google.drive({
      version: GOOGLE_DRIVE_VERSION,
      auth: authClient
    })

    const {
      data: {
        files = []
      }
    } = await drive.files.list({
      supportsAllDrives: true,
      corpora: 'drive',
      includeItemsFromAllDrives: true,
      fields: 'nextPageToken, files(id, name)',
      orderBy: 'createdTime desc',
      driveId
    })

    return files
  } catch (e) {
    if (hasErrorCode(e)) error(getErrorCode(e))
    error(getErrorMessage(e))
    throw e
  }
}

/**
 * Get a list of the JSON files from Google Drive
 *
 * @param {string} driveId Drive identifier
 * @param {Record<PropertyKey, string | undefined>} keyFile Authorisation
 * @param {string[]} scopes Authorisation scopes
 * @returns {Promise<Array<{id: string, name: string}>>}
 */
export default async function getListFromDrive (driveId, keyFile, scopes = SCOPES) {
  return (
    await getJsonFileList(
      driveId,
      await authorize(
        keyFile,
        scopes
      )
    )
  )
}
