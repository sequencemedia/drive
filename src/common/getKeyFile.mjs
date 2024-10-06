import {
  readFile
} from 'fs/promises'

export const KEY_FILE_PATH = './key-file.json'

export function getInstalled ({
  installed = null
}) {
  return installed
}

export function getWeb ({
  web = null
}) {
  return web
}

export default async function getKeyFile (keyfilePath = KEY_FILE_PATH) {
  const fileData = await readFile(keyfilePath)
  return (
    JSON.parse(fileData)
  )
}
