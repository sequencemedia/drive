/**
 * @typedef {import('google-auth-library').OAuth2Client} AuthClient
 * @typedef {import('googleapis').drive_v3 } DriveV3
 * @typedef {DriveV3.Schema$File} File
 */

import debug from 'debug'

import {
  Readable
} from 'node:stream'

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

const log = debug('@sequencemedia/drive/create')
const error = debug('@sequencemedia/drive/create:error')

log('`@sequencemedia/drive` is awake')

/**
 * Create a JSON file in Google Drive
 *
 * @param {string} driveId Drive identifier
 * @param {string} fileName JSON file identifier
 * @param {string} fileData JSON file contents
 * @param {AuthClient} authClient An authorised OAuth2 client
 * @returns {File}
 */
async function createJsonFile (driveId, fileName, fileData, authClient) {
  try {
    const drive = google.drive({
      version: GOOGLE_DRIVE_VERSION,
      auth: authClient
    })

    const {
      data
    } = await drive.files.create({
      supportsAllDrives: true,
      // includeItemsFromAllDrives: true,
      requestBody: {
        fields: 'id, name',
        parents: [
          driveId
        ],
        name: fileName
      },
      media: {
        mimeType: 'application/json',
        body: Readable.from(Buffer.from(fileData))
      }
    })

    return data
  } catch (e) {
    if (hasErrorCode(e)) error(getErrorCode(e))
    error(getErrorMessage(e))
    throw e
  }
}

/**
 * Create a JSON file in Google Drive
 *
 * @param {string} driveId Drive identifier
 * @param {string} fileName JSON file name
 * @param {Buffer} fileData JSON file data
 * @param {Record<PropertyKey, string | undefined>} keyFile Authorisation
 * @param {string[]} scopes Authorisation scopes
 * @returns {File}
 */
export default async function createInDrive (driveId, fileName, fileData, keyFile, scopes = SCOPES) {
  return (
    await createJsonFile(
      driveId,
      fileName,
      fileData.toString('utf8'),
      await authorize(
        keyFile,
        scopes
      )
    )
  )
}
