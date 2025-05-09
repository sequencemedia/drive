/**
 *  @typedef {import('google-auth-library').OAuth2Client} AuthClient
 *  @typedef {import('googleapis').drive_v3 } DriveV3
 *  @typedef {DriveV3.Schema$File} File
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

const log = debug('@sequencemedia/drive/get')
const error = debug('@sequencemedia/drive/get:error')

log('`@sequencemedia/drive` is awake')

/**
 *  Get a JSON file from Google Drive
 *
 *  @param {string} fileId JSON file identifier
 *  @param {AuthClient} authClient An authorised OAuth2 client
 *  @returns {File}
 */
async function getJsonFile (fileId, authClient) {
  try {
    const drive = google.drive({
      version: GOOGLE_DRIVE_VERSION,
      auth: authClient
    })

    const {
      data
    } = await drive.files.get({
      fileId,
      alt: 'media'
    })

    return data
  } catch (e) {
    if (hasErrorCode(e)) error(getErrorCode(e))
    error(getErrorMessage(e))
    throw e
  }
}

/**
 *  Get a JSON file from Google Drive
 *
 *  @param {string} fileId JSON file identifier
 *  @param {Record<PropertyKey, string | undefined>} keyFile Authorisation
 *  @param {string[]} scopes Authorisation scopes
 *  @returns {Promise<File>}
 */
export default async function getFromDrive (fileId, keyFile, scopes = SCOPES) {
  return (
    await getJsonFile(
      fileId,
      await authorize(
        keyFile,
        scopes
      )
    )
  )
}
