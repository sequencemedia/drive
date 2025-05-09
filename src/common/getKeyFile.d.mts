import {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/config'

/**
 *  @param {string | undefined | null} keyFileJson
 *  @param {string | undefined | null} keyFilePath
 *  @returns {Promise<KeyFileType>}
 */
export default function getKeyFile (keyFileJson: string | undefined | null, keyFilePath: string | undefined | null): Promise<KeyFileType>

export {
  KEY_FILE_JSON,
  KEY_FILE_PATH
}
