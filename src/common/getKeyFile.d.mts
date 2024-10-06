/**
 * @param {string | undefined | null} keyFileJson
 * @param {string | undefined | null} keyFilePath
 * @returns {Promise<KeyFileType>}
 */
export default function getKeyFile (keyFileJson: string | undefined | null, keyFilePath: string | undefined | null): Promise<KeyFileType>

export const KEY_FILE_JSON: string | undefined
export const KEY_FILE_PATH: string | undefined
