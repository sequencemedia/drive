import nconf from 'nconf'

import getKeyFile, {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/getKeyFile'

import getFromDrive from '@sequencemedia/drive/get'

const fileId = nconf.argv().env().get('file-id')

getKeyFile(KEY_FILE_JSON, KEY_FILE_PATH)
  .then((keyFile) => getFromDrive(fileId, keyFile))
  .then(console.log)
  .catch(console.error)
