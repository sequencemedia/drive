import {
  constants,
  access
} from 'node:fs/promises'

/**
 * @param {string | undefined | null} keyFilePath
 * @returns {Promise<boolean>}
 */
export default async function hasKeyFilePath (keyFilePath = null) {
  try {
    if (keyFilePath) {
      await access(keyFilePath, constants.R_OK)
      return true
    }
    return false
  } catch {
    return false
  }
}
