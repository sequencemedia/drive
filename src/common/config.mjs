import nconf from 'nconf'

const config = nconf.argv().env().defaults({
  KEY_FILE_JSON: null,
  KEY_FILE_PATH: null,
  GOOGLE_DRIVE_VERSION: 'v3'
}).get()

const {
  KEY_FILE_JSON,
  KEY_FILE_PATH,
  GOOGLE_DRIVE_VERSION
} = config

export default config

export {
  KEY_FILE_JSON,
  KEY_FILE_PATH,
  GOOGLE_DRIVE_VERSION
}
