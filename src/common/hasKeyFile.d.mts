import {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/config'

/**
 * @param {string | undefined | null} keyFileJson
 * @param {string | undefined | null} keyFilePath
 * @returns {Promise<boolean>}
 */
export default function hasKeyFile (keyFileJson: string | undefined | null, keyFilePath: string | undefined | null): Promise<boolean>

export {
  KEY_FILE_JSON,
  KEY_FILE_PATH
}
