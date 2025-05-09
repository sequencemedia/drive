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
 *  @param {string | undefined | null} keyFileJson
 *  @param {string | undefined | null} keyFilePath
 *  @returns {Promise<boolean>}
 */
export default async function hasKeyFile (keyFileJson, keyFilePath) {
  try {
    if (hasKeyFileJson(keyFileJson)) return true
    if (hasKeyFilePath(keyFilePath)) return true
    return false
  } catch {
    return false
  }
}
