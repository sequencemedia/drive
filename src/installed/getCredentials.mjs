import {
  readFile
} from 'fs/promises'

export const CREDENTIALS_PATH = './credentials.json'

export default async function getCredentials () {
  const fileData = await readFile(CREDENTIALS_PATH)
  const {
    installed = null
  } = JSON.parse(fileData)

  return installed
}
