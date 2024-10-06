/**
 * @typedef {import('google-auth-library').OAuth2Client} OAuth2Client
 */

import {
  readFile
} from 'fs/promises'

import {
  google
} from 'googleapis'

import getKeyFile from '#common/getKeyFile'

const KEY_FILE_PATH = './src/upload/key-file.json'

const SCOPES = [
  'https://www.googleapis.com/auth/drive.file'
]

/**
 * Authorize with service account and get jwt client
 *
 */
async function authorize () {
  const {
    client_email: clientEmail,
    private_key: privateKey
  } = await getKeyFile(KEY_FILE_PATH)

  const authClient = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    SCOPES
  )

  await authClient.authorize()

  return authClient
}

/**
 * Create a JSON file in Google Drive
 *
 * @param {string} id JSON file identifier
 * @param {string} body JSON file contents
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function createJsonFile (id, body, authClient) {
  try {
    const drive = google.drive({ version: 'v3', auth: authClient })
    const response = await drive.files.create({
      fields: 'id',
      requestBody: {
        name: `${id}.json`
      },
      media: {
        mimeType: 'application/json',
        body
      }
    })

    console.table(response.data)
  } catch (e) {
    console.error(e)
  }
}

authorize().then((authClient) => readFile('./src/upload/data.json').then((fileData) => createJsonFile('file-id', fileData.toString('utf8'), authClient))).catch(console.error)
