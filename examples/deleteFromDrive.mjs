import nconf from 'nconf'

import getKeyFile, {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/getKeyFile'

import deleteFromDrive from '@sequencemedia/drive/delete'

const fileId = nconf.argv().env().get('file-id')

getKeyFile(KEY_FILE_JSON, KEY_FILE_PATH)
  .then((keyFile) => deleteFromDrive(fileId, keyFile))
  .then(console.log)
  .catch(console.error)
