/**
 *  @param {string | undefined | null} keyFileJson
 *  @returns {boolean}
 */
export default function hasKeyFileJson (keyFileJson = null) {
  try {
    if (keyFileJson && JSON.parse(keyFileJson)) return true
    return false
  } catch {
    return false
  }
}
