import {
  readFile
} from 'node:fs/promises'

import {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/config'

import hasKeyFileJson from './hasKeyFileJson.mjs'
import hasKeyFilePath from './hasKeyFilePath.mjs'

export {
  KEY_FILE_JSON,
  KEY_FILE_PATH
}

/**
 * @param {string | undefined | null} keyFileJson
 * @param {string | undefined | null} keyFilePath
 * @returns {Promise<Record<PropertyKey, string | undefined>>}
 */
export default async function getKeyFile (keyFileJson, keyFilePath) {
  if (hasKeyFileJson(keyFileJson)) {
    return (
      JSON.parse(
        keyFileJson
      )
    )
  }

  if (await hasKeyFilePath(keyFilePath)) {
    return (
      JSON.parse(
        await readFile(keyFilePath)
      )
    )
  }
}
