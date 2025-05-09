/**
 *  @typedef {import('google-auth-library').OAuth2Client} AuthClient
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
  'https://www.googleapis.com/auth/drive.file'
]

const log = debug('@sequencemedia/drive/delete')
const error = debug('@sequencemedia/drive/delete:error')

log('`@sequencemedia/drive` is awake')

/**
 *  Delete a JSON file from Google Drive
 *
 *  @param {string} fileId JSON file identifier
 *  @param {AuthClient} authClient An authorised OAuth2 client
 *  @returns {Promise<void>}
 */
async function deleteJsonFile (fileId, authClient) {
  try {
    const drive = google.drive({
      version: GOOGLE_DRIVE_VERSION,
      auth: authClient
    })

    await drive.files.delete({
      supportsAllDrives: true,
      // includeItemsFromAllDrives: true,
      fileId
    })
  } catch (e) {
    if (hasErrorCode(e)) error(getErrorCode(e))
    error(getErrorMessage(e))
    throw e
  }
}

/**
 *  Delete a JSON file from Google Drive
 *
 *  @param {string} fileId JSON file identifier
 *  @param {Record<PropertyKey, string | undefined>} keyFile An authorised OAuth2 client
 *  @returns {Promise<void>}
 */
export default async function deleteFromDrive (fileId, keyFile, scopes = SCOPES) {
  return (
    await deleteJsonFile(
      fileId,
      await authorize(
        keyFile,
        scopes
      )
    )
  )
}
